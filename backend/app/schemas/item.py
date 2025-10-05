from pydantic import BaseModel


class ItemBase(BaseModel):
    name: str
    price: float
    image_id: str
    category_id: int


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int

    class Config:
        from_attributes = True