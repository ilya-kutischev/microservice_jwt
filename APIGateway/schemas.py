from typing import List, Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str


class Note(BaseModel):
    id: str
    title:str
    description:str
    picture: str
    latex: str

class NoteRequest(BaseModel):
    title:str
    description:str