from sqlalchemy.orm import declarative_base

# Базовый класс, от которого будут наследоваться все наши модели (User, Stamp и т.д.)
Base = declarative_base()