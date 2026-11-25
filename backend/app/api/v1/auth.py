from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from jwt import PyJWTError
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    get_password_hash,
    hash_token,
    verify_password,
)
from app.db.models import RefreshSession, User
from app.db.schemas import (
    RefreshRequest,
    TokenResponse,
    UserCreate,
    UserLogin,
    UserResponse,
)
from app.db.session import get_db
from app.services.captcha_service import verify_captcha

router = APIRouter(tags=["auth"])


def _as_utc(value: datetime) -> datetime:
    """Make a datetime timezone-aware (SQLite/older drivers may return naive values)."""
    return value if value.tzinfo is not None else value.replace(tzinfo=timezone.utc)


def _issue_tokens(db: Session, user: User) -> TokenResponse:
    access_token = create_access_token(str(user.email))
    refresh_token = create_refresh_token(str(user.email))
    claims = decode_token(refresh_token)

    session = RefreshSession(
        user_id=user.id,
        token_hash=hash_token(refresh_token),
        expires_at=datetime.fromtimestamp(claims["exp"], tz=timezone.utc),
    )
    db.add(session)
    db.commit()

    return TokenResponse(access_token=access_token, refresh_token=refresh_token)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(payload: UserCreate, db: Session = Depends(get_db)) -> User:
    email = str(payload.email).lower()

    existing = db.scalar(select(User).where(User.email == email))
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )

    user = User(
        email=email,
        hashed_password=get_password_hash(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=TokenResponse)
async def login(payload: UserLogin, db: Session = Depends(get_db)) -> TokenResponse:
    if not await verify_captcha(payload.captcha_token or ""):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Captcha verification failed",
        )

    email = str(payload.email).lower()
    user = db.scalar(select(User).where(User.email == email))

    if (
        user is None
        or not user.is_active
        or not verify_password(payload.password, user.hashed_password)
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    return _issue_tokens(db, user)


@router.post("/refresh", response_model=TokenResponse)
def refresh(payload: RefreshRequest, db: Session = Depends(get_db)) -> TokenResponse:
    try:
        claims = decode_token(payload.refresh_token)
    except PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    if claims.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    token_hash = hash_token(payload.refresh_token)
    session = db.scalar(
        select(RefreshSession).where(RefreshSession.token_hash == token_hash)
    )
    if (
        session is None
        or session.revoked
        or _as_utc(session.expires_at) <= datetime.now(timezone.utc)
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh session is expired or revoked",
        )

    user = db.get(User, session.user_id)
    if user is None or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User is not active",
        )

    # Rotate the refresh token: invalidate the old session and issue a new pair.
    session.revoked = True
    db.commit()

    return _issue_tokens(db, user)
