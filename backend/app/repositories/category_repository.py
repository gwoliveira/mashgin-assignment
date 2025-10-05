from sqlalchemy.orm import Session

from app.models.category import Category
from app.schemas.category import CategoryCreate


class CategoryRepository:
    def find_all(self, db: Session) -> list[Category]:
        return db.query(Category).all()
    
    def find_by_id(self, db: Session, category_id: int) -> Category | None:
        return db.query(Category).filter(Category.id == category_id).first()
    
    def save(self, db: Session, category: CategoryCreate) -> Category:
        db_category = Category(
            name=category.name,
            image_id=category.image_id
        )
        db.add(db_category)
        db.commit()
        db.refresh(db_category)
        return db_category


# Create a singleton instance
category_repository = CategoryRepository()