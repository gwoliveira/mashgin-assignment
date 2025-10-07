FROM python:3.12-slim-trixie


WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt


CMD ["bash", "-c", "alembic upgrade head && fastapi dev main.py --host 0.0.0.0 --port 80 --reload"]