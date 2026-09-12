// The base URL of your running FastAPI server.
const API_URL = "http://localhost:8000";

const form = document.getElementById("add-book-form");
const bookList = document.getElementById("book-list");

// Fetches all books from the API and renders them into the page.
async function loadBooks() {
  const response = await fetch(`${API_URL}/books`);
  const books = await response.json();

  bookList.innerHTML = ""; // clear the list before re-rendering

  books.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = `${book.title} by ${book.author} (${book.year})`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteBook(book.id));

    li.appendChild(deleteBtn);
    bookList.appendChild(li);
  });
}

// Sends a POST request with the form's values, then refreshes the list.
async function addBook(title, author, year) {
  await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, year }),
  });
  loadBooks();
}

// Sends a DELETE request for a specific book id, then refreshes the list.
async function deleteBook(id) {
  await fetch(`${API_URL}/books/${id}`, { method: "DELETE" });
  loadBooks();
}

// Handle form submission: prevent the default page reload,
// read the input values, send them, then clear the form.
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = parseInt(document.getElementById("year").value);

  addBook(title, author, year);
  form.reset();
});

// Load the book list as soon as the page opens.
loadBooks();