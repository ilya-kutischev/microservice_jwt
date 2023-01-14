import asyncio
import functools
import json
import logging
import signal
import sys
import confluent_kafka
from aiokafka import AIOKafkaConsumer, AIOKafkaProducer

from confluent_kafka import KafkaException
from time import time
from threading import Thread

import logging

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
        self.consumer.subscribe(pattern="recognizer_gateway")
        try:
            async for msg in self.consumer:
                logger.info(f'Message {msg} from {self.consumer}')
                data = json.loads(msg.value)
                new_data = {key: value for (key, value) in data.items()}
                if msg.topic == "recognizer_gateway":
                    print(new_data)
        finally:
            await self.consumer.stop()


"""============================PRODUCER LOGIC==================================="""
async def produce_message(topic="gateway_recognizer", msg=None):
    key = b'test key'
    value = b'test value'
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
