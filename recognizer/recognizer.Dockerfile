#FROM python:3.8-slim-buster
FROM python:3.10.6

RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip3 install psycopg2

RUN apt-get install ffmpeg libsm6 libxext6  -y
# 
WORKDIR /code
# 
COPY requirements.txt /requirements.txt
# 
RUN pip3 install --no-cache-dir --upgrade -r /requirements.txt
# 
COPY / ./

ENV PYTHONPATH /
# 
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
