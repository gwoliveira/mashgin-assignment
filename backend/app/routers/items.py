from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas import Item, ItemCreate

router = APIRouter()


@router.get("/", response_model=List[Item])
def read_items(
   
):
   return None