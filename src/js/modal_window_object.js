// // import amazon from '../images/icon/amazon.png';
// // import appleBooks from '../images/icon/Book.png';
// // import bookShop from '../images/icon/BookShop.png';
// // import axios from 'axios';

// // const bookGallery = document.querySelector('.book-gallery');
// // const modal = document.querySelector('.modal');
// // const modalContent = modal.querySelector('.modal-content');
// // const closeButton = modal.querySelector('.js-modal-close');

// // if (bookGallery) {
// //   bookGallery.addEventListener('click', openModal);
// // }
// // function openModal(event) {
// //   if (event.target.closest('.item-category-book')) {
// //     //   const bookId = event.target.closest('.item-category-book').dataset.bookId;
// //     //   showModal(bookId);
// //     const bookElement = event.target.closest('.item-category-book');
// //     const bookId = bookElement.dataset.bookId;
// //     const bookData = getBookData(bookId);
// //     showModal(bookData);
// //   }
// // }
// // function getBookData(bookId) {
// //   console.log(bookId);
// //   fetchingByBook(bookId).then(book => {
// //     console.log(book);

// //     const markup = `<div class="img-book" style="background-image: url('${book.book_image}');   background-size: cover;">
// //                     </div>
// //                     <div class="description-info">
// //                         <h2 class="title-name">${book.title}</h2>
// //                         <h3 class="author-book">${book.author}</h3>
// //                         <p class="description-book">${book.description}</p>
// //                         <ul class="shop-book">
// //                         <li class="name-books-shops">
// //                          <a href="${book.buy_links[0].url}"  " class="amazon-img">
// //                             <img
// //                             src="${amazon}"
// //                             alt="logo Amazon"
// //                             />
// //                           </a>
// //                         </li>
// //                         <li class="name-books-shops">
// //                           <a href="${book.buy_links[1].url}"  >
// //                             <img
// //                             src="${appleBooks}"
// //                             alt="logo shop" 
// //                             />
// //                           </a>
// //                         </li>
// //                         <li class="name-books-shops">
// //                           <a href="${book.buy_links[4].url}">
// //                             <img
// //                             src="${bookShop}"
// //                             alt="logo shop" 
// //                             />
// //                           </a>
// //                         </li>
// //                         </ul>
// //                     </div>
// //                     <button type="submit" class="js-add-to-shopping-list" data-id="${book._id}">Add to Shopping List</button>
// //                      `;
// //     modalContent.innerHTML = markup;
// //   });
// // }
// // // function showModal(bookId) {
// // //   //   console.log(Open modal for book with ID: ${bookId});
// // //   modal.style.display = 'block';
// // // }
// // function showModal(bookData) {
// //   modal.style.display = 'block';

// //   const closeButtons = modalContent.querySelectorAll('.js-modal-close');
// //   closeButtons.forEach(button => {
// //     button.addEventListener('click', hideModal);
// //   });

// //   const addToShoppingListButton = modalContent.querySelector(
// //     '.js-add-to-shopping-list'
// //   );
// //   addToShoppingListButton.addEventListener('click', addToShoppingList);
// // }
// // const platformLogos = modalContent.querySelectorAll('.platform-logo');
// // platformLogos.forEach(logo => {
// //   logo.addEventListener('click', openTradingPlatform);
// // });

// // function openTradingPlatform(event) {
// //   event.preventDefault();
// //   const tradingPlatformURL = event.target.closest('a').href;
// //   window.open(tradingPlatformURL, '_blank');
// // }

// // function hideModal() {
// //   modal.style.display = 'none';
// // }

// // function addToShoppingList(event) {
// //   const bookId = event.target.dataset.id;
// //   const shoppingList = getShoppingList();
// //   const bookData = getBookData(bookId);

// //   if (!isBookInShoppingList(bookId, shoppingList)) {
// //     shoppingList.push(bookData);
// //     saveShoppingList(shoppingList);
// //   }
// // } 

// // function getShoppingList() {
// //   const shoppingList = localStorage.getItem('shoppingList');
// //   return shoppingList ? JSON.parse(shoppingList) : [];
// // }

// // function isBookInShoppingList(bookId, shoppingList) {
// //   return shoppingList.some(book => book.id === bookId);
// // }

// // function addToShoppingList(bookId, shoppingList) {
// //   const bookData = getBookData(bookId);
// //   shoppingList.push(bookData);
// // }

// // function removeFromShoppingList(bookId, shoppingList) {
// //   const bookIndex = shoppingList.findIndex(book => book.id === bookId);
// //   if (bookIndex !== -1) {
// //     shoppingList.splice(bookIndex, 1);
// //   }
// // }

// // function saveShoppingList(shoppingList) {
// //   localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
// // }

// // // bookGallery.addEventListener('click', event => {
// // //   const clickedBook = event.target.closest('.book-card');
// // //   if (clickedBook) {
// // //     showModal(clickedBook);
// // //   }
// // // });

// //   closeButton.addEventListener('click', hideModal);

// // // modalContent.addEventListener('click', event => {
// // //   if (event.target === modalContent) {
// // //     hideModal();
// // //   }
// // // });

// // document.addEventListener('keydown', event => {
// //   if (event.key === 'Escape') {
// //     hideModal();
// //   }
// // });

// // ///////////////////////////////////////////////////////////////////

// // export async function fetchingByBook(id) {
// //   try {
// //     const response = await axios.get(
// //       `https://books-backend.p.goit.global/books/${id}`
// //     );
// //     console.log(response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.log('catch error', error);
// //   }
// // }


// import axios from 'axios';

// const bookGallery = document.querySelector('.book-gallery');
// const modal = document.querySelector('.modal');
// const modalContent = modal.querySelector('.modal-content');
// const closeButton = modal.querySelector('.js-modal-close');

// if (bookGallery) {
//   bookGallery.addEventListener('click', openModal);
// }

// function openModal(event) {
//   const bookElement = event.target.closest('.item-category-book');
//   if (bookElement) {
//     const bookId = bookElement.dataset.bookId;
//     getBookData(bookId).then(bookData => {
//       showModal(bookData);
//     });
//   }
// }

// async function getBookData(bookId) {
//   try {
//     const response = await fetchingByBook(bookId);
//     return response.data;
//   } catch (error) {
//     console.log('Error:', error);
//     return null;
//   }
// }

// function showModal(bookData) {
//   if (!bookData) {
//     return;
//   }

//   modal.style.display = 'block';
//   modalContent.innerHTML = createModalMarkup(bookData);

//   closeButton.addEventListener('click', hideModal);

//   const platformLogos = modalContent.querySelectorAll('.name-books-shops img');
//   platformLogos.forEach(logo => {
//     logo.addEventListener('click', openTradingPlatform);
//   });

//   const addToShoppingListButton = modalContent.querySelector(
//     '.js-add-to-shopping-list'
//   );
//   addToShoppingListButton.addEventListener('click', () => {
//     addToShoppingList(bookData);
//   });
// }

// function hideModal() {
//   modal.style.display = 'none';
// }

// function addToShoppingList(bookData) {
//   const shoppingList = getShoppingList();

//   if (!isBookInShoppingList(bookData._id, shoppingList)) {
//     shoppingList.push(bookData);
//     saveShoppingList(shoppingList);
//   }
// }

// function getShoppingList() {
//   const shoppingList = localStorage.getItem('shoppingList');
//   return shoppingList ? JSON.parse(shoppingList) : [];
// }

// function isBookInShoppingList(bookId, shoppingList) {
//   return shoppingList.some(book => book._id === bookId);
// }

// function saveShoppingList(shoppingList) {
//   localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
// }

// function createModalMarkup(book) {
//   const { _id, book_image, title, author, description, buy_links } = book;

//   return `
//     <div class="img-book" style="background-image: url('${book_image}'); background-size: cover;"></div>
//     <div class="description-info">
//       <h2 class="title-name">${title}</h2>
//       <h3 class="author-book">${author}</h3>
//       <p class="description-book">${description}</p>
//       <ul class="shop-book">
//         <li class="name-books-shops">
//           <a href="${buy_links[0].url}" class="amazon-img">
//             <img src="${amazon}" alt="logo Amazon">
//           </a>
//         </li>
//         <li class="name-books-shops">
//           <a href="${buy_links[1].url}">
//             <img src="${appleBooks}" alt="logo shop">
//           </a>
//         </li>
//         <li class="name-books-shops">
//           <a href="${buy_links[4].url}">
//             <img src="${bookShop}" alt="logo shop">
//           </a>
//         </li>
//       </ul>
//     </div>
//     <button type="submit" class="js-add-to-shopping-list" data-id="${_id}">Add to Shopping List</button>
//   `;
// }

// function openTradingPlatform(event) {
//   event.preventDefault();
//   const tradingPlatformURL = event.target.closest('a').href;
//   window.open(tradingPlatformURL, '_blank');
// }

// document.addEventListener('keydown', event => {
//   if (event.key === 'Escape') {
//     hideModal();
//   }
// });

// async function fetchingByBook(id) {
//   try {
//     const response = await axios.get(
//       `https://books-backend.p.goit.global/books/${id}`
//     );
//     return response.data;
//   } catch (error) {
//     console.log('Error:', error);
//     throw error;
//   }
// }
