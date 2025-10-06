from sqlalchemy.orm import Session
from app.models.order import Order
from app.schemas.order import OrderCreate
from app.models.order_item import OrderItem
from app.models.item import Item

class OrderRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_order(self, order: OrderCreate, total_price: float) -> Order:
        db_order = Order(total_price=total_price)
        self.db.add(db_order)
        self.db.flush()

        order_items = []
        item_ids = [item.item_id for item in order.items]
        items = self.db.query(Item).filter(Item.id.in_(item_ids)).all()
        item_map = {item.id: item for item in items}

        for item_data in order.items:
            item = item_map.get(item_data.item_id)
            if not item:
                raise Exception(f"Item with id {item_data.item_id} not found")

            db_order_item = OrderItem(
                order_id=db_order.id,
                item_id=item_data.item_id,
                quantity=item_data.quantity,
                price=item.price
            )
            order_items.append(db_order_item)

        self.db.bulk_save_objects(order_items)
        self.db.commit()
        self.db.refresh(db_order)
        return db_order
