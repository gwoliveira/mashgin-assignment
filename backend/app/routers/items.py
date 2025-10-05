from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.schemas.item import Item, ItemCreate
from app.services.item_service import item_service
from app.dependencies import get_db

router = APIRouter()


@router.get("/", response_model=List[Item])
def read_items(
    category_id: Optional[int] = None, db: Session = Depends(get_db)
):
    """
    Retrieve all items, optionally filtered by category_id.
    """
    return item_service.get_items(db, category_id=category_id)


@router.post("/", response_model=Item, status_code=201)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    """
    Create a new item.
    """
    try:
        return item_service.create_item(db, item)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))