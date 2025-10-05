"""Seed menu data from JSON

Revision ID: 66603c296a25
Revises: 3bcd6e8f2adb
Create Date: 2025-10-05 18:23:13.287412

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '66603c296a25'
down_revision: Union[str, None] = '3bcd6e8f2adb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Define table helpers
    category_table = sa.table('category',
        sa.column('id', sa.Integer),
        sa.column('name', sa.String),
        sa.column('image_id', sa.String)
    )
    item_table = sa.table('item',
        sa.column('id', sa.Integer),
        sa.column('name', sa.String),
        sa.column('price', sa.Float),
        sa.column('image_id', sa.String),
        sa.column('category_id', sa.Integer)
    )

    categories_data = [
        {"id": 1, "image_id": "f3fbf57b118fa9", "name": "Bakery"},
        {"id": 2, "image_id": "b271afbefdc554", "name": "Entrees"},
        {"id": 3, "image_id": "eba73b2361fae3", "name": "Drinks"}
    ]

    items_data = [
        {"category_id": 1, "id": 1, "image_id": "293202f9d9f7f4", "name": "Bagel", "price": 2.0},
        {"category_id": 1, "id": 2, "image_id": "808916fd5ddf96", "name": "Croissant", "price": 1.0},
        {"category_id": 1, "id": 3, "image_id": "95d02a230fe050", "name": "Muffin", "price": 1.25},
        {"category_id": 1, "id": 4, "image_id": "23f95765b967ff", "name": "Toast / Bread", "price": 1},
        {"category_id": 1, "id": 5, "image_id": "5650be5d48a99b", "name": "English Muffin", "price": 2.5},
        {"category_id": 2, "id": 6, "image_id": "bd237a0c0d19ef", "name": "Pasta Bar", "price": 12.99},
        {"category_id": 2, "id": 7, "image_id": "3e1bd1342800f7", "name": "Mediterranean Entree", "price": 10.99},
        {"category_id": 2, "id": 8, "image_id": "72589c4c990f97", "name": "Indian Entree", "price": 11.95},
        {"category_id": 3, "id": 9, "image_id": "70c2a6247e7b58", "name": "Small Drink", "price": 0.75},
        {"category_id": 3, "id": 10, "image_id": "dba0fc03da30ca", "name": "Medium Drink", "price": 1.5},
        {"category_id": 3, "id": 11, "image_id": "ffc9bf61e441cd", "name": "Large Drink", "price": 2}
    ]

    # Bulk insert categories
    op.bulk_insert(category_table, categories_data)

    # Bulk insert items
    op.bulk_insert(item_table, items_data)


def downgrade() -> None:
    # This will delete ALL data in the tables.
    op.execute('DELETE FROM item')
    op.execute('DELETE FROM category')
