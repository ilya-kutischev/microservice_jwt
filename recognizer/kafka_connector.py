import asyncio
import json
from aiokafka import AIOKafkaConsumer, AIOKafkaProducer
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
        self.consumer.subscribe(pattern="search_stats")
        try:
            async for msg in self.consumer:
                logger.info(f'Message {msg} from {self.consumer}')
                data = json.loads(msg.value)
                new_data = {key: value for (key, value) in data.items()}
                if msg.topic == "auth_search":
                    print(new_data)
        finally:
            await self.consumer.stop()


"""============================PRODUCER LOGIC==================================="""
async def produce_message(topic="stats_auth", msg=None):
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