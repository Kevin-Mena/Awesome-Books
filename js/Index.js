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
});