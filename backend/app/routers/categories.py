from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas import Category, CategoryCreate
from app.services.category_service import category_service
from app.dependencies import get_db

router = APIRouter()

@router.get("/", response_model=List[Category])
def read_categories(db: Session = Depends(get_db)):
    return category_service.get_categories(db)

