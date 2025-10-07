from pydantic import BaseModel
from typing import List
from ..schemas.item import Item

class PaymentCreate(BaseModel):
    card_number: str
    card_holder: str
    expiration_date: str
    cvv: str

class OrderItemCreate(BaseModel):
    item_id: int
    quantity: int

class OrderItem(BaseModel):
    id: int
    quantity: int
    price: float
    item: Item

    class Config:
        orm_mode = True

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    payment: PaymentCreate

class Order(BaseModel):
    id: int
    total_price: float
    status: str
    items: List[OrderItem]

    class Config:
        orm_mode = True
