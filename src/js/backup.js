const bookGallery = document.querySelector('.book-gallery');
const modal = document.querySelector('.modal');
const modalContent = modal.querySelector('.modal-content');
const closeButton = modal.querySelector('.js-modal-close');

if (bookGallery) {
  bookGallery.addEventListener('click', openModal);
}

function openModal(event) {
  if (event.target.closest('.item-category-book')) {
    //   const bookId = event.target.closest('.item-category-book').dataset.bookId;
    //   showModal(bookId);
    const bookElement = event.target.closest('.item-category-book');
    const bookId = bookElement.dataset.bookId;
    const bookData = getBookData(bookId);
    showModal(bookData);
  }
}
function getBookData(bookId) {
  return {
    id: bookId,
    coverImage: 'book-cover.jpg',
    name: 'Book Name',
    author: 'Author Name',
    description: 'Book description goes here.',
    tradingPlatforms: [
      { name: 'Amazon', link: 'https://amazon.com' },
      { name: 'Platform 2', link: 'https://rozetka.com' },
      { name: 'Platform 3', link: 'https://platform3.com' },
    ],
  };
}
function showModal(bookId) {
  modal.style.display = 'block';
}

function showModal(bookData) {
  modal.style.display = 'block';
  modalContent.innerHTML = `
    <div class="modal-header">
     <img class="book-cover" src="${bookData.coverImage}" alt="Book Cover">
      <button class="js-modal-close">Close</button>
    </div>
    <div class="modal-body">
      <h2>${bookData.name}</h2>
      
      <p class="author-book"><strong>Author:</strong> ${bookData.author}</p>
      <p class="description-book"><strong>Description:</strong> ${
        bookData.description
      }</p>
      <h4>Trading Platforms:</h4>
      <ul>
        ${bookData.tradingPlatforms
          .map(
            platform =>
              `<li><a href="${platform.link}" target="_blank">${platform.name}</a></li>`
          )
          .join('')}
      </ul>
      <button class="js-add-to-shopping-list">Add to Shopping List</button>
    </div>
  `;

  const closeButtons = modalContent.querySelectorAll('.js-modal-close');
  closeButtons.forEach(button => {
    button.addEventListener('click', hideModal);
  });

  const addToShoppingListButton = modalContent.querySelector(
    '.js-add-to-shopping-list'
  );
  addToShoppingListButton.addEventListener('click', toggleShoppingList);
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

function toggleShoppingList() {
  const bookId = modalContent.querySelector('.js-add-to-shopping-list').dataset
    .bookId;
  const shoppingList = getShoppingList();

  if (isBookInShoppingList(bookId, shoppingList)) {
    removeFromShoppingList(bookId, shoppingList);
  } else {
    addToShoppingList(bookId, shoppingList);
  }

  saveShoppingList(shoppingList);
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

// // bookGallery.addEventListener('click', event => {
// //   const clickedBook = event.target.closest('.book-card');
// //   if (clickedBook) {
// //     showModal(clickedBook);
// //   }
// // });

// // closeButton.addEventListener('click', hideModal);

// // modalContent.addEventListener('click', event => {
// //   if (event.target === modalContent) {
// //     hideModal();
// //   }
// // });

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    hideModal();
  }
});
