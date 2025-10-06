from sqlalchemy.orm import Session
from app.models.order import Order
from app.schemas.order import OrderCreate
from app.models.order_item import OrderItem
from app.models.item import Item

class OrderRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_order(self, order: OrderCreate) -> Order:
        total_price = 0
        db_order = Order(total_price=0)  # Initial price
        self.db.add(db_order)
        self.db.flush()

        order_items = []
        for item_data in order.items:
            item = self.db.query(Item).filter(Item.id == item_data.item_id).first()
            if not item:
                raise Exception(f"Item with id {item_data.item_id} not found")
            
            price = item.price * item_data.quantity
            total_price += price
            
            db_order_item = OrderItem(
                order_id=db_order.id,
                item_id=item_data.item_id,
                quantity=item_data.quantity,
                price=price
            )
            order_items.append(db_order_item)
        
        self.db.bulk_save_objects(order_items)
        db_order.total_price = total_price
        self.db.commit()
        self.db.refresh(db_order)
        return db_order
