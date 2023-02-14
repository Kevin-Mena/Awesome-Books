// create an array for book collection
// function to add book to collection
// function to remove book from collection
const bookCollection = [];
const display = document.getElementById('display-books');
const title = document.getElementById('book-title');
const author = document.getElementById('book-author');
const btnAdd = document.getElementById('add');

function collection() {
  display.innerHTML = '';


  for (let i = 0; i < bookCollection.length; i += 1) {
    display.innerHTML += `<div class="book">
        <h3>${bookCollection[i].title}</h3>
        <p>${bookCollection[i].author}</p>
        <button class="remove" onclick="remove(${i})">Remove</button>
        </div>`;
  }
}
function remove(index) {
  bookCollection.splice(index, 1);
  localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
  collection();
}

function add(e) {
  e.preventDefault();
  if (title.value !== '' && author.value !== '') {
    const book = {
      title: title.value,
      author: author.value,
    };

    bookCollection.push(book);
    collection();
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
  }
}
btnAdd.addEventListener('click', add);
remove();