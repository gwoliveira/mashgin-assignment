from sqlalchemy.orm import Session
from typing import List, Optional

from app.models.item import Item
from app.schemas.item import ItemCreate


class ItemRepository:
    def find_all(self, db: Session, category_id: Optional[int] = None) -> List[Item]:
        query = db.query(Item)
        if category_id:
            query = query.filter(Item.category_id == category_id)
        return query.all()

    def save(self, db: Session, item: ItemCreate) -> Item:
        db_item = Item(**item.dict())
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item


item_repository = ItemRepository()
