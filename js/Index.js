
const form = document.querySelector('.form');
class Book {
  constructor(title, author, index) {
    this.title = title;
    this.author = author;
    this.index = index;
  }

  static displayBooks() {
    const books = Book.getBooks();
    books.forEach((book) => Book.addBookToList(book));
  }

  static addBookToList(book) {
    const library = document.querySelector('.library');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td> by ${book.author}</td> 
    <td><button class='remove'>
    remove
    </button></td>
   `;
    library.appendChild(row);
    const removeButton = row.querySelector('button');
    removeButton.addEventListener('click', (e) => {
      this.removeBook(book.index);
      this.deleteBooks(e.target);
    });
  }

  static addBook(book) {
    const books = this.getBooks();
    if (books.length === 0) {
      book.index = 0;
    } else {
      const lastIndex = books.slice(-1).pop().index;
      book.index = lastIndex + 1;
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static deleteBooks(el) {
    if (el.classList.contains('remove')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('.input-author').value = '';
    document.querySelector('.input-book').value = '';
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static removeBook(elemIndex) {
    let books = Book.getBooks();
    books = books.filter(
      (book) => parseInt(book.index, 10) !== parseInt(elemIndex, 10),
    );
    localStorage.setItem('books', JSON.stringify(books));
  }
}
document.addEventListener('DOMContentLoaded', Book.displayBooks);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const author = document.querySelector('.input-author').value;
  const title = document.querySelector('.input-book').value;
  if (author === '' || title === '') {
    alert('Please fill in all fields');
  }
  const book = new Book(title, author);
  Book.addBookToList(book);
  Book.addBook(book);
  Book.clearFields();
=======
// create an array for book collection
// function to add book to collection
// function to remove book from collection
const display = document.getElementById('display-books');
const title = document.getElementById('book-title');
const author = document.getElementById('book-author');
const btnAdd = document.getElementById('add');

const bookCollection = JSON.parse(localStorage.getItem('bookCollection')) || [];

display.innerHTML = `
    ${bookCollection
    .map((book, index) => `
      <div class="user-input">
        <h3 class="input-value">${book.title}</h3>
        <p class="input-value">${book.author}</p>
        <button class="delete-btn" id=${index}>Remove</button>
      </div>
    `)
    .join('')}
  `;

window.addEventListener('load', () => {
  btnAdd.addEventListener('click', (event) => {
    event.preventDefault();
    if ((title.value === '') || (author.value === '')) {
      alert('Please put a title and author');
    } else {
      bookCollection.push({ title: title.value, author: author.value });
      display.innerHTML = `
      ${bookCollection
    .map((book, index) => `
        <div class="user-input">
          <h3 class="input-value">${book.title}</h3>
          <p class="input-value">${book.author}</p>
          <button class="delete-btn" id=${index}>Remove</button>
        </div>
      `)
    .join('')}
    `;
      localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
    }
  });

  display.addEventListener('click', (event) => {
    bookCollection.splice(event.target.id, 1);
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
    display.innerHTML = `
    ${bookCollection
    .map((book, index) => `
      <div class="user-input">
        <h3 class="input-value">${book.title}</h3>
        <p class="input-value">${book.author}</p>
        <button class="delete-btn" id=${index}>Remove</button>
      </div>
    `)
    .join('')}
  `;
  });
});