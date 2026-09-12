# Library System API + Frontend

A small REST API for managing books, built with FastAPI, with a
vanilla JavaScript frontend to interact with it.

## Features

- Add a book (POST)
- List all books (GET)
- Get a single book by ID (GET)
- Delete a book (DELETE)
- Simple frontend to add, view, and delete books in the browser

## Requirements

- Python 3.7+
- `fastapi`, `uvicorn`

## Setup

1. Create a virtual environment and install dependencies:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Run the API:

```bash
uvicorn main:app --reload
```

The API runs at `http://localhost:8000`. Interactive docs are available
at `http://localhost:8000/docs`.

3. In a separate terminal, serve the frontend:

```bash
cd frontend
python3 -m http.server 5500
```

Then open `http://localhost:5500` in your browser.

## Project structure

library-api/
├── main.py # FastAPI app and endpoints
├── requirements.txt
├── books.json # created automatically on first run
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
└── README.md

## API endpoints

| Method | Path          | Description             |
| ------ | ------------- | ----------------------- |
| POST   | `/books`      | Add a new book          |
| GET    | `/books`      | List all books          |
| GET    | `/books/{id}` | Get a single book by ID |
| DELETE | `/books/{id}` | Delete a book           |
