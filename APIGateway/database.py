from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

#PASSWORD AND LOGIN TO DB NEED TO BE IN .ENV
# engine = create_engine("postgresql://postgres:postgres@postgres:5432/")
engine = create_engine(os.environ.get('POSTGRES_ENGINE'))

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()