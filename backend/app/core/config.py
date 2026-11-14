from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # БД
    DB_USER: str = "philatelist_user"
    DB_PASSWORD: str = "password"
    DB_NAME: str = "philatelist_db"
    DB_HOST: str = "localhost"
    DB_PORT: str = "5432"

    # JWT
    JWT_SECRET: str = "super_secret"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # hCaptcha
    HCAPTCHA_SECRET_KEY: str = "0x0000000000000000000000000000000000000000"

    # Автоматически собираем URL для подключения к БД
    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    # Говорим Pydantic читать файл .env
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()