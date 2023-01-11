# 
FROM python:3.8-slim-buster


RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip3 install psycopg2
# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt

# 
RUN pip3 install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./app /code/app

ENV PYTHONPATH "/code/app"

# 
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
