from sqlalchemy.orm import Session
import os
import hashlib
import base64
from datetime import datetime, timedelta
from typing import Optional, OrderedDict
from jwt import *
import json
import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    salt = os.urandom(32)
    key = hashlib.pbkdf2_hmac(
        'sha256', # The hash digest algorithm for HMAC
        user.password.encode('utf-8'), # Convert the password to bytes
        salt, # Provide the salt
        100000 # It is recommended to use at least 100,000 iterations of SHA-256 
    )   
        #Bytes encoded to Base64 but still in byte format
    encodedSalt = base64.b64encode(salt)
    encodedKey = base64.b64encode(key)
    # fake_hashed_password = user.password + "notreallyhashed"
     
    db_user = models.User(email=user.email, hashed_password=encodedKey.decode('utf-8'),salt=encodedSalt.decode('utf-8'))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_user_note(db:Session, note:dict):
    print(note)
    # note = json.loads(note)
    db_item = models.Note(**note)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    # returning object
    item = db_item
    note = OrderedDict()
    note["id"] = item.id
    note["title"] = item.title
    note["description"] = item.description
    note["picture"] = item.picture
    note["latex"] = item.latex
    return note


def update_user_note(db:Session, note:dict):
    # print(note)
    # note = json.loads(note)
    user_id=note["owner_id"]
    db_item = models.Note(**note)
    updateObject = db.query(models.Note).filter_by(owner_id=user_id,id=note["id"]).first()
    updateObject.description = db_item.description
    updateObject.title = db_item.title
    db.commit()
    db.refresh(updateObject)
    # returning object
    item = db_item
    note = OrderedDict()
    note["id"] = item.id
    note["title"] = item.title
    note["description"] = item.description
    note["picture"] = item.picture
    note["latex"] = item.latex
    return note


def get_user_notes(db: Session, user: schemas.User,skip: int = 0, limit: int = 100):
    items = db.query(models.Note).filter_by(owner_id=user.id).offset(skip).limit(limit).all()
    notes = []
    for item in items:
        note = OrderedDict()
        note["id"]=item.id
        note["title"] =  item.title
        note["description"] = item.description
        note["picture"] = item.picture
        note["latex"] = item.latex
        notes.append(note)
    return notes


def get_note_by_pic(db: Session, user: schemas.User, picture):
    items = db.query(models.Note).filter_by(owner_id=user.id, picture=picture)
    notes = []
    for item in items:
        note = OrderedDict()
        note["id"]=item.id
        note["title"] =  item.title
        note["description"] = item.description
        note["picture"] = item.picture
        note["latex"] = item.latex
        notes.append(note)
    return notes

def get_note_by_id(db: Session, user: schemas.User, note_id:int):
    items = db.query(models.Note).filter_by(owner_id=user.id, id=note_id)
    notes = []
    for item in items:
        note = OrderedDict()
        note["id"]=item.id
        note["title"] =  item.title
        note["description"] = item.description
        note["picture"] = item.picture
        note["latex"] = item.latex
        notes.append(note)
    return notes

def delete_user_note(db: Session, note:dict):
    # note = json.loads(note)
    user_id = note["owner_id"]
    item = db.query(models.Note).filter_by(owner_id=user_id,id=note["id"]).first()
    # db.add(db_item)
    db.delete(item)
    db.commit()
    return item