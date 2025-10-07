from pydantic import BaseModel, field_validator, Field
from typing import List
import re
from ..schemas.item import Item

class PaymentCreate(BaseModel):
    card_number: str = Field(..., min_length=13, max_length=19) # Common card lengths
    card_holder: str
    expiration_date: str
    cvv: str = Field(..., min_length=3, max_length=4)

    @field_validator('card_holder')
    def validate_card_holder_not_blank(cls, value):
        if not value.strip():
            raise ValueError('Card holder name cannot be blank')
        return value

    @field_validator('expiration_date')
    def validate_expiration_date_format(cls, value):
        if not re.match(r'^(0[1-9]|1[0-2])\/([0-9]{2})$', value):
            raise ValueError('Invalid expiration date format. Must be MM/YY.')
        return value

    @field_validator('card_number')
    def validate_card_number_digits(cls, value):
        if not value.isdigit():
            raise ValueError('Card number must contain only digits')
        # A more robust Luhn algorithm check could be added here if needed
        return value

class OrderItemCreate(BaseModel):
    item_id: int
    quantity: int = Field(..., gt=0)

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
