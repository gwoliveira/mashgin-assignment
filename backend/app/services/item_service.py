from sqlalchemy.orm import Session
from typing import List, Optional

from app.models.item import Item
from app.schemas.item import ItemCreate
from app.repositories.item_repository import item_repository


class ItemService:
    def __init__(self, repository=item_repository):
        self.repository = repository

    def get_items(self, db: Session, category_id: Optional[int] = None) -> List[Item]:
        return self.repository.find_all(db, category_id=category_id)

    def create_item(self, db: Session, item: ItemCreate) -> Item:
        return self.repository.save(db, item)


item_service = ItemService()
