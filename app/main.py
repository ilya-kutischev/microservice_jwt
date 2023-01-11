from typing import List
from fastapi import Depends, FastAPI, HTTPException,Request
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import crud, models, schemas,security
from database import SessionLocal, engine
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from routers import files
import re


ACCESS_TOKEN_EXPIRE_MINUTES = 30


models.Base.metadata.create_all(bind=engine)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app = FastAPI()

app.include_router(files.router)

origins = "*"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    print(user.email)
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    db_user = crud.get_user_by_email(db, email=user.email)
    if (re.fullmatch(regex, user.email)==None):
        raise HTTPException(status_code=409, detail="Invalid Email Address")
    if db_user:
        raise HTTPException(status_code=409, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.post("/users/{user_id}/items/", response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)


@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):

    db_user = crud.get_user_by_email(db, email=form_data.username)
    if not (security.verify_hash(form_data.password,db_user.salt).decode('utf-8') == db_user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )


    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token}

@app.get("/user",response_model=schemas.User)
async def get_current_user(token: str,db: Session = Depends(get_db)):
    email=security.get_current_user_email(token)
    db_user = crud.get_user_by_email(db, email=email)
    print(db_user)
    return db_user

@app.get("/user/notes")
async def get_current_user(access_token: str,db: Session = Depends(get_db)):
    print(access_token)
    email=security.get_current_user_email(access_token)
    db_user = crud.get_user_by_email(db, email=email)
    return crud.get_user_notes(db,db_user)

@app.post("/user/notes")
async def post_user_items(request:Request,access_token:str,title:str, description:str,db: Session = Depends(get_db)):

    print("TOKEN:",access_token)
    email=security.get_current_user_email(access_token)
    print("EMAIL DONE")
    db_user = crud.get_user_by_email(db, email=email)

    note = {
        "title":title,
        "description":description,
        "owner_id":db_user.id
            }

    try:
        crud.create_user_note(db,note)
    except IntegrityError:
        db.rollback()
        crud.update_user_note(db,note)

    return {"message":note}

@app.put("/user/notes")
async def update_user_note(request:Request,access_token:str,note_id:int,title:str, description:str,db: Session = Depends(get_db)):

    email=security.get_current_user_email(access_token)
    db_user = crud.get_user_by_email(db, email=email)
    note = {
        "id":note_id,
        "title": title,
        "description": description,
        "owner_id": db_user.id
    }
    crud.update_user_note(db,note)
    return {"message":note}

@app.delete("/user/notes")
async def delete_user_items(request:Request,access_token:str,note_id:int,db: Session = Depends(get_db)):
    email=security.get_current_user_email(access_token)
    db_user = crud.get_user_by_email(db, email=email)
    note = {
        "id": note_id,
        "owner_id": db_user.id
    }
    print(note)
    crud.delete_user_note(db,note)

    return {"message":note}
    
