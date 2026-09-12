"""
Library system API

A small REST API for managing books, built with FastAPI
Data is persisted to a local JSON file
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os

DATA_FILE = "books.json"

app = FastAPI(title="Library System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class Book(BaseModel):
    title: str
    author: str
    year: int

def load_books():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE,"r") as f:
        return json.load(f)

def save_books(books):
    with open(DATA_FILE, "w") as f:
        json.dump(books, f, indent=2)

@app.post("/books")
def add_book(book: Book):
    books = load_books()
    new_id = (max((b["id"] for b in books), default=0)) +1
    new_book = {"id":new_id, "title":book.title, "author":book.author, "year":book.year }
    books.append(new_book)
    save_books(books)
    return new_book

@app.get("/books")
def list_books():
    return load_books()

@app.get("/books/{book_id}")
def get_book(book_id: int):
    books = load_books()
    for b in books:
        if b["id"] == book_id:
            return b
    raise HTTPException(status_code=404, detail="Book not found")

@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    books = load_books()
    updated = [b for b in books if b["id"] != book_id]
    if len(updated) == len(books):
        raise HTTPException(status_code=404, detail="Book not found")
    save_books(updated)
    return {"message": f"Book {book_id} deleted"}