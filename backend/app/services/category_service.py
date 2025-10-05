from sqlalchemy.orm import Session
from typing import List

from app.models.category import Category
from app.schemas.category import CategoryCreate
from app.repositories.category_repository import category_repository


class CategoryService:
    def __init__(self, repository=category_repository):
        self.repository = repository

    def get_categories(self, db: Session) -> List[Category]:
        return self.repository.find_all(db)
    
    def create_category(self, db: Session, category: CategoryCreate) -> Category:
        return self.repository.save(db, category)
    
    def get_category(self, db: Session, category_id: int) -> Category | None:
        return self.repository.find_by_id(db, category_id)


# Create a singleton instance
category_service = CategoryService()