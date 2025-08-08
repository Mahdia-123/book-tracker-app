const bookInput = document.getElementById("bookName");
const authorInput = document.getElementById("authorName");
const finishedInput = document.getElementById("finishedInput");
const booksList = document.getElementById("booksList");

let savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];

function renderBooks() {
  booksList.innerHTML = "";

  savedBooks.forEach(({ book, author, finished }, index) => {
    const statusText = finished ? "Finished" : "Unfinished";

    const entry = document.createElement("div");
    entry.innerHTML = `
      <div class="d-flex justify-content-between mt-3 align-items-center">
        <div>
          <div class="book-name" style="font-weight: bold; font-size: 16px;">${book}</div>
          <div class="book-author" style="opacity: 0.6; font-size: 12px; margin-bottom: 10px;">${author}</div>
        </div>
        <div style="font-style: italic; font-weight: 600; color: ${
          finished ? "green" : "red"
        };">
          ${statusText}
        </div>
        <div>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </div>
      </div>
    `;
    booksList.appendChild(entry);
  });

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteBook);
  });
}

function deleteBook(event) {
  const index = event.target.getAttribute("data-index");
  savedBooks.splice(index, 1);
  localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
  renderBooks();
}

function dislplayBookList(event) {
  event.preventDefault();

  const bookName = bookInput.value.trim();
  const authorName = authorInput.value.trim();
  const finished = finishedInput.checked;

  if (bookName === "" || authorName === "") return;

  savedBooks.push({ book: bookName, author: authorName, finished });
  localStorage.setItem("savedBooks", JSON.stringify(savedBooks));

  renderBooks();

  // Clear inputs
  bookInput.value = "";
  authorInput.value = "";
  finishedInput.checked = false;
}

let button = document.getElementById("button");
button.addEventListener("click", dislplayBookList);

// Render saved books on page load
renderBooks();

// displsu buttons
let hideButton = document.getElementById("hideBook");
let showButton = document.getElementById("showBook");

function showBooks() {
  booksList.style.display = "block";
}
function hideBooks() {
  booksList.style.display = "none";
}

showButton.addEventListener("click", showBooks);
hideButton.addEventListener("click", hideBooks);

let body = document.body;

function changeTheme() {
  if (body.classList.contains("light-theme")) {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
  }
}

let changeThemeButton = document.querySelector(".change-theme");
changeThemeButton.addEventListener("click", changeTheme);
