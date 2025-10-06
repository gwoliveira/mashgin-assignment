from pydantic import BaseModel, computed_field

class ItemBase(BaseModel):
    name: str
    price: float
    image_id: str
    category_id: int

class ItemCreate(ItemBase):
    id: int

class Item(ItemBase):
    id: int

    @computed_field
    @property
    def image_url(self) -> str:
        return f"/static/images/{self.image_id}.jpg"

    class Config:
        orm_mode = True