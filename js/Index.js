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