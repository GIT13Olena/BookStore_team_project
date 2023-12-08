import amazon from '../images/icon/amazon.png';
import appleBooks from '../images/icon/Book.png';
import bookShop from '../images/icon/BookShop.png';
import axios from 'axios';

const bookGallery = document.querySelector('.book-gallery');
const modal = document.querySelector('.modal');
const modalContent = modal.querySelector('.modal-content');
const closeButton = modal.querySelector('.js-modal-close');

if (bookGallery) {
  bookGallery.addEventListener('click', openModal);
}
function openModal(event) {
  if (event.target.closest('.item-category-book')) {
    const bookElement = event.target.closest('.item-category-book');
    const bookId = bookElement.dataset.bookId;
    const bookData = getBookData(bookId);
    showModal(bookData);
  }
}
function getBookData(bookId) {
  fetchingByBook(bookId).then(book => {
    const markup = `
    <div class="block-img-info">
      <div class="img-book" 
        style="background-image: url('${book.book_image}'); 
        background-size: cover; 
        width:192px; height:281px;">
      </div>

      <div class="description-info">
        <h2 class="title-name">${book.title}</h2>
        <h3 class="author-book">${book.author}</h3>
        <p class="description-book">${book.description}</p>
        <ul class="shop-book">
          <li class="name-books-shops">
            <a href="${book.buy_links[0].url}"  " class="amazon-img">
              <img
                src="${amazon}"
                alt="logo Amazon"
              />
            </a>
          </li>
          <li class="name-books-shops">
            <a href="${book.buy_links[1].url}"  >
              <img
              src="${appleBooks}"
              alt="logo shop"
              />
            </a>
          </li>
          <li class="name-books-shops">
            <a href="${book.buy_links[4].url}">
              <img
              src="${bookShop}"
              alt="logo shop"
            />
            </a>
          </li>
        </ul>
      </div>             
    </div>

       
      <button type="submit" class="js-add-to-shopping-list" data-id="${book._id}">Add to Shopping List</button>
                     `;
    modalContent.innerHTML = markup;
  });
}

function showModal(bookData) {
  modal.style.display = 'block';

  const closeButtons = modalContent.querySelectorAll('.js-modal-close');
  closeButtons.forEach(button => {
    button.addEventListener('click', hideModal);
  });

  const addToShoppingListButton = modalContent.querySelector(
    '.js-add-to-shopping-list'
  );
  addToShoppingListButton.addEventListener('click', addToShoppingList);
}
const platformLogos = modalContent.querySelectorAll('.platform-logo');
platformLogos.forEach(logo => {
  logo.addEventListener('click', openTradingPlatform);
});

function openTradingPlatform(event) {
  event.preventDefault();
  const tradingPlatformURL = event.target.closest('a').href;
  window.open(tradingPlatformURL, '_blank');
}

function hideModal() {
  modal.style.display = 'none';
}

function addToShoppingList(event) {
  const bookId = event.target.dataset.id;
  const shoppingList = getShoppingList();
  const bookData = getBookData(bookId);

  if (!isBookInShoppingList(bookId, shoppingList)) {
    shoppingList.push(bookData);
    saveShoppingList(shoppingList);
  }
}

function getShoppingList() {
  const shoppingList = localStorage.getItem('shoppingList');
  return shoppingList ? JSON.parse(shoppingList) : [];
}

function isBookInShoppingList(bookId, shoppingList) {
  return shoppingList.some(book => book.id === bookId);
}

function addToShoppingList(bookId, shoppingList) {
  const bookData = getBookData(bookId);
  shoppingList.push(bookData);
}

function removeFromShoppingList(bookId, shoppingList) {
  const bookIndex = shoppingList.findIndex(book => book.id === bookId);
  if (bookIndex !== -1) {
    shoppingList.splice(bookIndex, 1);
  }
}

function saveShoppingList(shoppingList) {
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

closeButton.addEventListener('click', hideModal);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    hideModal();
  }
});

export async function fetchingByBook(id) {
  try {
    const response = await axios.get(
      `https://books-backend.p.goit.global/books/${id}`
    );
    return response.data;
  } catch (error) {}
}
