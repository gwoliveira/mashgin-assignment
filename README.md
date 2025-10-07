# Mashgin Project

## Overview

This project consists of a FastAPI backend, a React frontend, and a PostgreSQL database, all orchestrated using Docker Compose for easy development and deployment. The setup is designed to provide a seamless development experience with hot-reloading for both frontend and backend services.

## Development Setup

To get started with development, you'll need Docker and Docker Compose installed on your system.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/gwoliveira/mashgin-assignment
    cd mashgin-assignment
    ```

2.  **Build and run the services:**
    Navigate to the root directory of the project and run the following command:
    ```bash
    docker-compose up --build
    ```
    This command will:
    *   Build the Docker images for the backend and frontend.
    *   Start three containers in development mode:
        *   **`db`**: A PostgreSQL database.
        *   **`backend`**: A FastAPI application with hot-reloading enabled. It also runs `alembic upgrade head` automatically to apply database migrations on startup.
        *   **`frontend`**: A React application with hot-reloading enabled. It's configured to proxy API requests to the `backend` service.

3.  **Access the applications:**
    *   **Frontend:** Open your web browser and navigate to `http://localhost:3000`.
    *   **Backend API:** The backend API is accessible internally within the Docker network at `http://backend:80` and from your host machine at `http://localhost:8000`.

4.  **Development Workflow:**
    *   **Backend:** Any changes saved to the files in the `backend/` directory on your host machine will automatically trigger a reload of the FastAPI server inside the `backend` container.
    *   **Frontend:** Any changes saved to the files in the `frontend/src/` directory on your host machine will automatically trigger a hot-reload of the React application in your browser.

## Key Technologies

*   **Backend:** FastAPI, SQLAlchemy, Alembic, PostgreSQL
*   **Frontend:** React, Material-UI, Axios
*   **Containerization:** Docker, Docker Compose

## Project Management

This project utilizes a GitHub Kanban dashboard to track issues and manage the development process. You can view the project board here: [https://github.com/users/gwoliveira/projects/1](https://github.com/users/gwoliveira/projects/1)
