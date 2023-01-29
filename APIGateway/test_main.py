"""
to execute tests:
docker-compose up -d --build
docker-compose exec apigateway pytest .
ps deleted __init__ file because tests couldn't run
"""
import random

from fastapi.security import OAuth2PasswordRequestForm
from starlette.testclient import TestClient

from fastapi import security
# from main import app
from main import app

client = TestClient(app)
# TestClient.SQLALCHEMY_SILENCE_UBER_WARNING=1
class testUser():
    email = f"{random.randint(1,100000)}@gmail.com"
    password = f"{random.randint(10000000,1000000000)}"

testUser = testUser()

def test_create_user_no_info():
    response = client.post("/users/")
    assert response.status_code == 422

def test_create_user():

    response = client.post("/users/", json={
        "email": testUser.email,
        "password": testUser.password
    })
    assert response.status_code == 200


def test_create_user_duplicate():

    response = client.post("/users/", json={
        "email": testUser.email,
        "password": testUser.password
    })
    assert response.status_code == 409

def test_create_user_incorrect_email():

    response = client.post("/users/", json={
        "email": "dijisjoewjoidjofja",
        "password": testUser.password
    })
    assert response.status_code == 409

def test_token_success():
    response = client.post("/token", data={
            "username":testUser.email,
            "password":testUser.password
    },
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    )
    assert response.status_code == 200
    # print(response.json())
    assert response.json()['access_token']
    testUser.token = response.json()['access_token']