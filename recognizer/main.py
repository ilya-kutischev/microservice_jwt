from cv2 import cv2
import numpy as np
from fastapi import UploadFile, File
from fastapi import APIRouter
import asyncio
import pymongo
from fastapi import FastAPI
from starlette import status
from starlette.responses import JSONResponse
from kafka_connector import produce_message, AsyncConsumer
from recognizer_model import photo_to_latex, model

router = APIRouter()
app = FastAPI()
app.include_router(router)
origins = "*"


def add_datasearch(datasearch):
    client = pymongo.MongoClient(
        host="mongodb",
        port=27017,
    )
    db = client["statistics"]
    data = db["data"]
    print("STATS COLLECTION CREATED ========================================    ")

    search = data.find_one({"datasearch": datasearch})
    if search is None:
        datasearch = {
            "datasearch": datasearch,
            "count": 1
        }
        data.insert_one(datasearch)
    else:
        data.update_one({"datasearch": datasearch},{"$inc": {"count": 1}})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content='')


config = {"bootstrap.servers": "localhost:9092"}


@app.on_event("startup")
async def startup_event():
    try:
        aio_consumer = AsyncConsumer()
        loop = asyncio.get_running_loop()
        loop.create_task(aio_consumer.consume())

    except (KeyboardInterrupt, SystemExit):
        print("Stats consumer FAILED")


@app.get("/", tags=["root"])
async def read_root() -> dict:
    res = photo_to_latex("image.png", model)
    return {"message": f"Welcome to our service. Your recognition: {res}"}


@app.post("/analyze")
async def analyze_route(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.fromstring(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    print("DONE SAVING")
    res = photo_to_latex(img, model)
    return {"message": f"Welcome to our service. Your recognition: {res}"}