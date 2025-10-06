from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.order import OrderCreate, Order
from app.services.order_service import OrderService

router = APIRouter()

@router.post("/", response_model=Order)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    service = OrderService(db)
    return service.create_order(order)
