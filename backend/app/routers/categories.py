from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.category import Category, CategoryCreate
from app.services.category_service import category_service
from app.dependencies import get_db

router = APIRouter()

@router.get("", response_model=List[Category])
def read_categories(db: Session = Depends(get_db)):
    """
    Retrieve all categories.
    """
    return category_service.get_categories(db)

@router.post("", response_model=Category, status_code=201)
def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    """
    Create a new category.
    """
    try:
        return category_service.create_category(db, category)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

