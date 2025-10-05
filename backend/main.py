from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from app.routers import categories, items


app = FastAPI(title="Mashgin Menu API")

# Include routers
app.include_router(categories.router, prefix="/categories", tags=["categories"])
app.include_router(items.router, prefix="/items", tags=["items"])
