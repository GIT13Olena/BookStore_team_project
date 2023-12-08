import { FetchBooks } from './best_sellers_fetch';
import Notiflix from 'notiflix';

const fetchBooks = new FetchBooks();
const galleryBook = document.querySelector('.book-gallery');

let category = '';

// BEST SELLERS
export async function renderCategory() {
  try {
    const { data } = await fetchBooks.fetchTopBooks();
    return data;
  } catch (error) {
    Notiflix.Notify.failure('Oops! Something went wrong... Please try again.');
  }
}

export async function makeBestSellersOneTime() {
  const categories = await renderCategory();
  const screenWidth = window.screen.width;
  let numOfBooks;

  if (screenWidth < 768) {
    numOfBooks = 1;
  } else if (screenWidth < 1280) {
    numOfBooks = 3;
  } else {
    numOfBooks = 5;
  }

  let bookList = '';
  for (let i = 0; i < categories.length; i += 1) {
    const { list_name, books } = categories[i];
    const booksOnDisplay = books.slice(0, numOfBooks);

    const bookItems = booksOnDisplay
      .map(
        book => `
          <li class="item-category-book" data-book-id="${book._id}">
            <a class="link-books-render" href="#" onclick="event.preventDefault()">
              
                <div class="img-card-book">
                  <img src="${book.book_image}" alt="book" class="img-book">
                  
                </div>
                <div class="book-info">
                    <p class="title-book">${book.title}</p>
                    <p class="author-book">${book.author}</p>
                </div>
              
            </a>
          </li>
        `
      )
      .join('');

    bookList += `
      <li>
        <h3 class="item-category">${list_name}</h3>
        <ul class="box-category">
          ${bookItems}
        </ul>
        <button type="button" aria-label="Show more" class="see-more">See more</button>
      </li>
    `;
  }

  if (galleryBook) {
    galleryBook.innerHTML = '';
    galleryBook.insertAdjacentHTML('beforeend', bookList);
    const titleBestsellerToRemove = document.querySelector(
      '.title-best-sellers'
    );
    if (!titleBestsellerToRemove) {
      galleryBook.insertAdjacentHTML(
        'beforebegin',
        `
      <h2 class="title-best-sellers">Best sellers <span class ="title-best-sellers-color">books</span></h2>
      `
      );
    } else {
      titleBestsellerToRemove.innerHTML =
        '<h2 class="title-best-sellers">Best sellers <span class ="title-best-sellers-color">books</span></h2>';
    }
  }
}
makeBestSellersOneTime();

if (galleryBook) {
  galleryBook.addEventListener('click', seeMoreBooks);
}

async function seeMoreBooks(event) {
  try {
    if (event.target.nodeName === 'BUTTON') {
      category = event.target
        .closest('li')
        .querySelector('h3')
        .textContent.trim();

      const renderCategory = await renderingCategory();
      let bookList = '';
      renderCategory.forEach(({ _id, book_image, title, author }) => {
        bookList += `
          <li class="item-category-book" data-book-id="${_id}">
            <a class="link-books-render" href="#" onclick="event.preventDefault()">
              
                <div class="img-card-book" >
                  <img src="${book_image}" alt="book" class="img-book">
                  
                </div>
                <div class="book-info">
                    <p class="title-book">${title}</p>
                    <p class="author-book">${author}</p>
                </div>
              
            </a>
          </li>
          `;
      });
      galleryBook.innerHTML = '';
      galleryBook.previousElementSibling.remove();
      galleryBook.insertAdjacentHTML('beforeend', bookList);
      galleryBook.insertAdjacentHTML(
        'beforebegin',
        `<h2 class="title-category">${category}</h2>`
      );
      // scrollToBegin();

      const titleLastWord = galleryBook.previousElementSibling;

      function lastWordForTitle() {
        if (titleLastWord.classList.contains('title-category')) {
          const textTitle = titleLastWord.textContent.trim();
          const allWords = textTitle.split(' ');
          const lastWord = allWords[allWords.length - 1];
          titleLastWord.innerHTML = textTitle.replace(
            lastWord,
            `<span class="second-category-word">${lastWord}</span>`
          );
        }
        return;
      }
      lastWordForTitle();
    }
    return;
  } catch (error) {
    Notiflix.Notify.failure('Oops! Something went wrong... Please try again.');
  }
}

async function renderingCategory() {
  try {
    fetchBooks.category = category;
    const { data } = await fetchBooks.fetchCategoryOfBooks();
    return data;
  } catch (error) {
    Notiflix.Notify.failure('Oops! Something went wrong... Please try again.');
  }
}

let currentRenderWidth = window.innerWidth;
addEventListener('resize', () => {
  if (
    (window.innerWidth > 767 && currentRenderWidth < 768) ||
    (window.innerWidth > 1279 && currentRenderWidth < 1280) ||
    (window.innerWidth < 1280 && currentRenderWidth > 1279) ||
    (window.innerWidth < 768 && currentRenderWidth > 767)
  ) {
    currentRenderWidth = window.innerWidth;
    location.reload();
  }
});
