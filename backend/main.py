from fastapi import FastAPI

from app.routers import categories, items


app = FastAPI(title="Mashgin Menu API")

# Include routers
app.include_router(categories.router, prefix="/categories", tags=["categories"])
app.include_router(items.router, prefix="/items", tags=["items"])
