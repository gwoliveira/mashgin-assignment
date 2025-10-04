from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal, engine



app = FastAPI()



@app.get("/")
def read_root():
    return {"Hello": "World"}