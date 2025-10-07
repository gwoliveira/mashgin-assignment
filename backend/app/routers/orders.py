from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.order import OrderCreate, Order
from app.services.order_service import OrderService

router = APIRouter()

@router.post("", response_model=Order)
def create_order(order: OrderCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    service = OrderService(db)
    return service.create_order(order, background_tasks)

@router.get("/{order_id}", response_model=Order)
def get_order_details(order_id: int, db: Session = Depends(get_db)):
    service = OrderService(db)
    return service.get_order_details(order_id)
