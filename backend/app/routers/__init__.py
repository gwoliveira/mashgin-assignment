from fastapi import APIRouter

from app.routers import categories, items

api_router = APIRouter()
api_router.include_router(categories.router, prefix="/categories", tags=["categories"])
api_router.include_router(items.router, prefix="/items", tags=["items"])