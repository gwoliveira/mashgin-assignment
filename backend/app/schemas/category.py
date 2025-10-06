from pydantic import BaseModel, computed_field
from fastapi import Request

class CategoryBase(BaseModel):
    name: str
    image_id: str

class CategoryCreate(CategoryBase):
    id: int

class Category(CategoryBase):
    id: int

    @computed_field
    @property
    def image_url(self) -> str:
        return f"/static/images/{self.image_id}.jpg"

    class Config:
        orm_mode = True