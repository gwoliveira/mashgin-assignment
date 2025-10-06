from pydantic import BaseModel, field_validator
from typing import List
import re

class PaymentCreate(BaseModel):
    card_number: str
    card_holder: str
    expiration_date: str
    cvv: str

class OrderItemCreate(BaseModel):
    item_id: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    payment: PaymentCreate

    @field_validator('payment')
    def validate_expiration_date(cls, value):
        if not re.match(r'^(0[1-9]|1[0-2])\/\d{2}$', value.expiration_date):
            raise ValueError('Invalid expiration date format. Must be in MM/YY format.')
        return value

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
