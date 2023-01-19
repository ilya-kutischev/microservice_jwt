from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, LargeBinary, Index
from sqlalchemy.orm import relationship
import hashlib

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    salt= Column(String)
    is_active = Column(Boolean, default=True)

    notes = relationship("Note",back_populates="owner")


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True,autoincrement=True)
    title = Column(String)
    description = Column(String)
    picture = Column(String)
    latex = Column(String, index=True)
    # создаем хеш индекс по картинке
    Index('my_index', latex, postgresql_using='hash')

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="notes")
