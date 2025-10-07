from sqlalchemy.orm import Session
from app.repositories.order_repository import OrderRepository
from app.schemas.order import OrderCreate, Order
from app.models.item import Item

class OrderService:
    def __init__(self, db: Session):
        self.db = db
        self.repository = OrderRepository(db)

    def create_order(self, order: OrderCreate) -> Order:
        total_price = 0
        item_ids = [item.item_id for item in order.items]
        items = self.db.query(Item).filter(Item.id.in_(item_ids)).all()
        item_map = {item.id: item for item in items}

        for item_data in order.items:
            item = item_map.get(item_data.item_id)
            if not item:
                raise Exception(f"Item with id {item_data.item_id} not found")
            total_price += item.price * item_data.quantity

        return self.repository.create_order(order, total_price)

    def get_order_details(self, order_id: int) -> Order:
        return self.repository.get_order_by_id(order_id)
