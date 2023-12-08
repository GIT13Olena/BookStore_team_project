import { bookList_2 } from './shopping_data.js';

import Amazon from '../images/icon/amazon.png';
import Book from '../images/icon/Book.png';
import BookShop from '../images/icon/BookShop.png';

const keyLockal = 'shoppingList';
const shList = [
  {
    book_image:
      'https://storage.googleapis.com/du-prd/books/images/9780063226050.jpg',
    title: 'zxczxc',
    list_name: 'Hardcover Fiction',
    description:
      'item-card-desc">David Burroughs was once a devoted father to his three-year-old son Matthew, living a dream life just a short drive away from the working-class suburb where he and his wife, Cheryl, first fell in love--until one fateful night when David woke suddenly to discover Matthew had been murdered while',
    author: 'Harlan Coben',
  },
  {
    book_image:
      'https://storage.googleapis.com/du-prd/books/images/9780063226050.jpg',
    title: 'qweqwe',
    list_name: 'Hardcover Fiction',
    description:
      'item-card-desc">David Burroughs was once a devoted father to his three-year-old son Matthew, living a dream life just a short drive away from the working-class suburb where he and his wife, Cheryl, first fell in love--until one fateful night when David woke suddenly to discover Matthew had been murdered while',
    author: 'Harlan Coben',
  },
];

// function saveShoppingList(shList) {
//     localStorage.setItem(keyLockal, JSON.stringify(shList));
// }
function saveShoppingList(bookL) {
  localStorage.setItem(keyLockal, JSON.stringify(bookL));
}

// saveShoppingList(shList);

const titleEl = document.querySelector('.shopping-title');
titleEl.addEventListener('click', onDataTest);

function onDataTest() {
  saveShoppingList(bookList_2);
  getShoppingList();
  onResetList();
  onRender();
}

let isMobileScreen = onMobileScreen(); //Мобильная версия? true. false

const bookList = getShoppingList();
let totalBook = bookList.length; //Всего книг в памяти

function getShoppingList() {
  const shoppingList = localStorage.getItem('shoppingList');
  return shoppingList ? JSON.parse(shoppingList) : [];
}

let perPage = makePerPage(); //Количество книг на странице      3 / 4
let totalPage = Math.ceil(totalBook / perPage); //К-во страниц
let lastPerPage = makeLastPerPage(); //Остаток книг неполной страницы

let currentPage = 1; // Текущая страница / по умолчанию 1
let numberRender = 0; //Сколько пизиций рендирить

let howManyBtn = onHowManyBtn(); // Сколько кнопок TURN должно отбражаться 1-4
let currentBtn = 1; // текущая активная кнопка
let maxBtn = onmaxBtn(); //Максимальное ко-во кнопок  3 / 4

const shoppingListEl = document.querySelector('.shopping-list'); // render shoppinglist
const emptyBookEl = document.querySelector('.empty-book-wrapper'); // empty-book

let removeBookBtns = [];

//========= TURN Page ===============
const shoplistBtn = document.querySelector('.shopping-list-btn'); // Кнопки листания страниц
shoplistBtn.addEventListener('click', onTurnPage);

const turnBtnsArray = document.querySelectorAll('.turn-number'); //Массив кнопок 1234

onShowButtons(); // Отображение кнопок
onWriteButtons(); // Подпись кнопок

function onTurnPage(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  const selectedBtn = event.target.dataset.turn;
  switch (selectedBtn) {
    case 'start':
      onTurnStartPage();
      break;
    case 'prev':
      onTurnPrevPage();
      break;

    case '1':
      if (currentBtn === 1 || currentPage > currentBtn) {
        break;
      }
      turnBtnsArray[currentBtn - 1].classList.remove('turn-active'); //remove Color
      currentPage -= currentBtn - 1;
      currentBtn = 1;
      onRender();
      onWriteButtons();
      break;

    case '2':
      if (currentBtn !== 2) {
        turnBtnsArray[currentBtn - 1].classList.remove('turn-active'); //remove Color
        currentPage -= currentBtn - 2;
        currentBtn = 2;
        onRender();
        onWriteButtons();
      }
      break;

    case '3':
      if (
        currentBtn === 3 ||
        (totalPage - currentPage > maxBtn - currentBtn && isMobileScreen)
      ) {
        break;
      }

      turnBtnsArray[currentBtn - 1].classList.remove('turn-active'); //remove Color
      currentPage -= currentBtn - 3;
      currentBtn = 3;
      onRender();
      onWriteButtons();
      break;

    case '4':
      if (currentBtn === 4 || totalPage - currentPage > maxBtn - currentBtn) {
        break;
      }
      turnBtnsArray[currentBtn - 1].classList.remove('turn-active'); //remove Color
      currentPage -= currentBtn - 4;
      currentBtn = 4;
      onRender();
      onWriteButtons();
      break;

    case 'next':
      onTurnNextPage();
      break;
    case 'end':
      onTurnEndtPage();
    // break;
    // default:
    //555
  }
}

//========= TURN totalPageS Конец ===============

// ======= DELETE BOOK ===========

function onRemoveBook(event) {
  //Видалення слухачів з кнопок
  for (let i = 0; i < numberRender; i++) {
    removeBookBtns[i].removeEventListener('click', onRemoveBook);
  }

  // Видалення книжки по data-set
  const numDataSet = Number(event.target.dataset.set);
  const indexDelete = numDataSet + (currentPage - 1) * perPage;
  bookList.splice(indexDelete, 1);
  totalBook = bookList.length; //удалили книгу с памяти массива
  saveShoppingList(bookList);

  //Если книг нет Выход
  if (!totalBook) {
    onResetList();
    return;
  }
  // Если книги есть

  //--Turn-------------------
  let lastTotalPage = totalPage; // Прошлое количество страниц
  totalPage = Math.ceil(totalBook / perPage); // Новое количество страниц

  // Если стало на 1 страницу меньше
  if (totalPage < lastTotalPage) {
    howManyBtn = onHowManyBtn();

    if (totalPage <= maxBtn) {
      if (currentBtn > 1) {
        turnBtnsArray[currentBtn - 1].classList.remove('turn-active'); //remove Color
        currentBtn--;
        currentPage--;
      }

      onShowButtons();
      onWriteButtons();
    } else {
      if (currentPage > totalPage) {
        currentPage = totalPage;
        onWriteButtons();
      }
    }
  }

  lastPerPage = makeLastPerPage(); //Остаток книг
  onRender();
}

// ======= RENDER  Временно! ================

// const renderBtn = document.querySelector('[data-render]');
// renderBtn.addEventListener('click', onRender);

function onRender() {
  if (totalBook) {
    //Если книги есть
    if (!emptyBookEl.classList.contains('is-hidden')) {
      emptyBookEl.classList.add('is-hidden');
    }
    shoplistBtn.classList.remove('is-hidden');
  } else {
    return;
  }
  numberRender = totalBook >= currentPage * perPage ? perPage : lastPerPage;

  const x = (currentPage - 1) * perPage;
  const itemArr = []; //Массив для рендеру html

  for (let i = 0; i < numberRender; i++) {
    const markaup = `
            <li class="shopping-item">
                <div class="item-card-thumb">
                    <img src="${bookList[i + x].book_image}" alt="book">
                </div>       
                <div class="item-card-wrap">
                    <h3 class="item-card-title">${bookList[i + x].title}</h3>
                    <p class="item-card-category">${
                      bookList[i + x].list_name
                    }</p>
                    <p class="item-card-desc">${
                      bookList[i + x].description
                    }</p>       
                    <div class="item-card-bottom-wrap">
                        <p class="item-card-author">${
                          bookList[i + x].author
                        }</p>
                        <ul class="item-card-stores-wrap">
                            <li class="item-card-icons">
                                <img src=${Amazon} width="32" alt="b">
                            </li>
                            <li class="item-card-icon">
                                <img src=${Book} width="30" alt="b">
                            </li>
                            <li class="item-card-icon">
                                <img src=${BookShop} width="30" alt="b">
                            </li>
                        </ul>
                    </div>
                    <button class="remove-btn" data-set="${i}">x</button>
                </div>
            </li>
        `;
    itemArr[i] = markaup;
  }
  const markaupAll = itemArr.join('');
  shoppingListEl.innerHTML = markaupAll;

  // Чіпляємо слухачі на кнопки видалення
  removeBookBtns = document.querySelectorAll('.remove-btn'); // []
  for (let i = 0; i < numberRender; i++) {
    removeBookBtns[i].addEventListener('click', onRemoveBook);
  }
}

onRender();

// =============== FUNCTIONS ===============

// ======= RESET ==========!

// const resetBtn = document.querySelector('[data-reset]');
// resetBtn.addEventListener('click', onResetList);

function onResetList() {
  emptyBookEl.classList.remove('is-hidden');
  shoplistBtn.classList.add('is-hidden');
  shoppingListEl.innerHTML = '';

  // turnBtnsArray = [1, 2, 3, 4];
  // turnBtnsArray = [firstBtnEl, secondBtnEl, thirdBtnEl, restBtnEl];

  for (let i = 0; i < turnBtnsArray.length; i++) {
    if (turnBtnsArray[i].classList.contains('is-hidden')) {
      continue;
    }
    turnBtnsArray[i].classList.add('is-hidden');
  }

  isMobileScreen = onMobileScreen(); //Мобильная версия? true. false
  totalBook = bookList.length; //Всего книг в памяти
  perPage = makePerPage(); //Количество книг на странице      3 / 4
  totalPage = Math.ceil(totalBook / perPage); //К-во страниц
  lastPerPage = makeLastPerPage(); //Остаток книг неполной страницы

  currentPage = 1; // Текущая страница / по умолчанию 1
  numberRender = 0; //Сколько пизиций рендирить

  howManyBtn = onHowManyBtn(); // Сколько кнопок TURN должно отбражаться 1-4
  currentBtn = 1; // текущая активная кнопка
  maxBtn = onmaxBtn(); //Максимальное ко-во кнопок  3 / 4
  // turnBtnsArray = makeBtnsArr(); //создаем массив динамических кнопок пагинации
  // onRenderButtons(); // отображаем динамические кнопки пагинации из массива
  onShowButtons();
  // onWriteButtons();

  //классы прицепить
}

// NEXT

function onTurnNextPage() {
  if (currentPage < totalPage) {
    if (currentBtn === maxBtn - 1 && totalPage > currentPage + 1) {
      //write
      currentPage++;
    } else {
      // move
      turnBtnsArray[currentBtn - 1].classList.remove('turn-active'); //remove Color
      currentPage++;
      currentBtn++;
    }
    onRender();
    onWriteButtons();
  }
}

// PREVIOS

function onTurnPrevPage() {
  if (currentPage === 1) {
    return;
  }
  if (currentBtn === 2 && currentPage > 2) {
    //write
    currentPage--;
  } else {
    // move
    turnBtnsArray[currentBtn - 1].classList.remove('turn-active'); //remove Color
    currentPage--;
    currentBtn--;
  }
  onRender();
  onWriteButtons();
}

// START

function onTurnStartPage() {
  if (currentBtn === 1) {
    return;
  }
  // move
  turnBtnsArray[currentBtn - 1].classList.remove('turn-active'); //remove Color
  currentPage = 1;
  currentBtn = 1;
  onRender();
  onWriteButtons();
}

// END

function onTurnEndtPage() {
  if (currentBtn === howManyBtn) {
    return;
  }
  // move
  turnBtnsArray[currentBtn - 1].classList.remove('turn-active'); //remove Color
  currentPage = totalPage;
  currentBtn = howManyBtn;
  onRender();
  onWriteButtons();
}

function onMobileScreen() {
  if (window.innerWidth > 767) {
    return false;
  }
  return true;
}

function makePerPage() {
  if (isMobileScreen) {
    return 4;
  }
  return 3;
}

function makeLastPerPage() {
  return totalBook % perPage;
}

function onHowManyBtn() {
  if (isMobileScreen) {
    return totalPage > 2 ? 3 : totalPage;
  }
  return totalPage > 3 ? 4 : totalPage;
}

function onmaxBtn() {
  return isMobileScreen ? 3 : 4;
}

// Показываем кнопки
function onShowButtons() {
  for (let i = 0; i < maxBtn; i++) {
    if (!turnBtnsArray[i].classList.contains('is-hidden')) {
      turnBtnsArray[i].classList.add('is-hidden');
    }
  }
  for (let j = 0; j < howManyBtn; j++) {
    turnBtnsArray[j].classList.remove('is-hidden');
  }
}

// Записываем значения
function onWriteButtons() {
  for (let i = 0; i < howManyBtn; i++) {
    if (currentPage - currentBtn && !i) {
      turnBtnsArray[i].textContent = '...';
    } else if (
      totalPage - currentPage > maxBtn - currentBtn &&
      i === howManyBtn - 1
    ) {
      turnBtnsArray[i].textContent = '...';
    } else {
      turnBtnsArray[i].textContent = currentPage - (currentBtn - 1) + i; //1
    }
  }
  turnBtnsArray[currentBtn - 1].classList.add('turn-active'); // active Color
}
