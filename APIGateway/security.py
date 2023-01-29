import base64
import hashlib
import json
from datetime import datetime, timedelta
from typing import Optional

from fastapi import HTTPException
from starlette.responses import Response

from jwt import encodeJWT, decodeJWT
import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

#THEN WILL MIGRATE TO .ENV
SECRET_KEY = os.environ.get('SECRET_KEY')

ALGORITHM = os.environ.get('ALGORITHM')


def verify_hash(password,savedSalt):
    # Salt is in utf-8 string I need to encode it in Base64 and then decode the Base64 to bytes
    savedSalt = savedSalt.encode('utf-8')
    savedSalt = base64.b64decode(savedSalt)
    key = hashlib.pbkdf2_hmac(
    'sha256', # The hash digest algorithm for HMAC
    password.encode('utf-8'), # Convert the password to bytes
    savedSalt, # Provide the salt
    100000 # It is recommended to use at least 100,000 iterations of SHA-256 
)   
    key = base64.b64encode(key)
    return key


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire.isoformat()})
    encoded_jwt = encodeJWT(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user_email(token):
    decoded = decodeJWT(token, SECRET_KEY)
    try:
        user_email = json.loads(decoded["payload"])["sub"]
    except TypeError:
        # return Response(status_code=403, content="Wrong JWT")
        raise TypeError("Wrong JWT")
    return user_email

# аналог проверки oauth2token но лучше уже использовать то что уже есть пусть это будет закомментировано
# def verify_token(token: str):
#     try:
#         verifyJWT(token, SECRET_KEY)
#     except ValueError:
#        raise HTTPException(
#             status_code=401,
#             detail="Incorrect TOKEN",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     return token

