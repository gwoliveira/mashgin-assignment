from pydantic import BaseModel
from typing import List

class OrderItemCreate(BaseModel):
    item_id: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]

class OrderItem(BaseModel):
    id: int
    quantity: int
    price: float
    item_id: int

    class Config:
        orm_mode = True

class Order(BaseModel):
    id: int
    total_price: float
    status: str
    items: List[OrderItem]

    class Config:
        orm_mode = True
