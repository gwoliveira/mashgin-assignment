import enum

from sqlalchemy import Column, DateTime, Enum, Float, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.models.base import Base


class OrderStatus(enum.Enum):
    PENDING = "PENDING"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"


class Order(Base):
    id = Column(Integer, primary_key=True, index=True)
    total_price = Column(Float, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    status = Column(
        Enum(OrderStatus), default=OrderStatus.PENDING, nullable=False
    )

    items = relationship("OrderItem", back_populates="order")
