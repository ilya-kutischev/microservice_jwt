import asyncio
import binascii
import json
from cv2 import cv2
import numpy as np
from aiokafka import AIOKafkaConsumer, AIOKafkaProducer
import logging
from recognizer_model import photo_to_latex, model

logger = logging.getLogger('uvicorn.info')
"""============================CONSUMER LOGIC==================================="""


class AsyncConsumer:
    def __init__(self):
        self.loop = asyncio.get_running_loop()
        self.consumer = AIOKafkaConsumer(
            loop=self.loop,
            bootstrap_servers="kafka:9092"
        )

    async def consume(self):
        await self.consumer.start()
        self.consumer.subscribe(pattern="gateway_recognizer")
        try:
            async for msg in self.consumer:
                logger.info(f'Message {msg} from {self.consumer}')
                data = json.loads(msg.value)
                new_data = {key: value for (key, value) in data.items()}
                if msg.topic == "gateway_recognizer":
                    payload = new_data["payload"]
                    request_id = new_data["request_id"]
                    contents = binascii.unhexlify(payload[2:-1])
                    nparr = np.fromstring(contents, np.uint8)
                    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                    res = photo_to_latex(img, model)
                    logger.info("RES:", res)
                    message = {"payload": res, "request_id": request_id}
                    await produce_message(topic="recognizer_gateway", msg=message)

        finally:
            await self.consumer.stop()


"""============================PRODUCER LOGIC==================================="""


async def produce_message(topic="recognizer_gateway", msg=None):
    if msg is None:
        msg = {
                "header": "Used to search",
                "data": "used for adding data"
        }
    msg = json.dumps(msg).encode('utf-8')
    producer = AIOKafkaProducer(
        loop=asyncio.get_running_loop(),
        bootstrap_servers="kafka:9092",
        )
    await producer.start()
    await producer.send_and_wait(
        topic, value=msg)
    await producer.stop()