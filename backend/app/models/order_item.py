from sqlalchemy import Column, Float, ForeignKey, Integer
from sqlalchemy.orm import relationship

from app.models.base import Base


class OrderItem(Base):
    id = Column(Integer, primary_key=True, index=True)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    order_id = Column(Integer, ForeignKey("order.id"))
    item_id = Column(Integer, ForeignKey("item.id"))

    order = relationship("Order", back_populates="items")
    item = relationship("Item")
