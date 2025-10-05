from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.models.base import Base


class Item(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Float)
    image_id = Column(String)
    category_id = Column(Integer, ForeignKey("category.id"))

    category = relationship("Category", back_populates="items")