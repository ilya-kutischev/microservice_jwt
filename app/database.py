from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#PASSWORD AND LOGIN TO DB NEED TO BE IN .ENV
engine = create_engine("postgresql://postgres:postgres@postgres:5432/")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()