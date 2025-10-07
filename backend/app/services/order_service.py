from sqlalchemy.orm import Session
from app.repositories.order_repository import OrderRepository
from app.schemas.order import OrderCreate, Order
from app.models.item import Item
from app.models.order import Order as DBOrder
from fastapi import BackgroundTasks
import asyncio
from app.dependencies import get_db

class OrderService:
    def __init__(self, db: Session):
        self.db = db
        self.repository = OrderRepository(db)

    async def _complete_order_task(self, order_id: int):
        await asyncio.sleep(5)  # Simulate a delay
        for db_session in get_db():
            db_order = db_session.query(DBOrder).filter(DBOrder.id == order_id).first()
            if db_order:
                db_order.status = "COMPLETED"
                db_session.add(db_order)
                db_session.commit()
                db_session.refresh(db_order)
            break

    def create_order(self, order: OrderCreate, background_tasks: BackgroundTasks) -> Order:
        total_price = 0
        item_ids = [item.item_id for item in order.items]
        items = self.db.query(Item).filter(Item.id.in_(item_ids)).all()
        item_map = {item.id: item for item in items}

        for item_data in order.items:
            item = item_map.get(item_data.item_id)
            if not item:
                raise Exception(f"Item with id {item_data.item_id} not found")
            total_price += item.price * item_data.quantity

        db_order = self.repository.create_order(order, total_price)
        background_tasks.add_task(self._complete_order_task, db_order.id)
        return db_order

    def get_order_details(self, order_id: int) -> Order:
        return self.repository.get_order_by_id(order_id)
