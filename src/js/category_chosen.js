import { renderCategory } from './best_sellers_render';
import { FetchBooks } from './best_sellers_fetch';
import { makeBestesselersOneMoreTime } from './best_sellers_render';
const categoriesBlock = document.querySelector('.categories-list');

const topBooks = document.querySelector('.book-gallery');
const allCategories = document.querySelector('.all-categories');
const allCategoriesItems = document.querySelectorAll('.categories-item');
const allCategoriesItem = document.querySelector('.categories-item');
const galleryBook = document.querySelector('.book-gallery');

categoriesBlock.addEventListener('click', chooseCategory);
//  categoriesBlock.addEventListener('click', makeActive);

// allCategoriesItem.addEventListener('click',makeActive )
// function makeActive() {
// allCategoriesItems.forEach(itemCategory => {
//   itemCategory.addEventListener('click', event => {
// const activeCategory = document.querySelector(
//   '.active'
// );
// if (activeCategory) {
//   activeCategory.classList.remove('active');
// }
// event.target.classList.add('active');

//   });
// });
// }

function chooseCategory(event) {
  //  makeActive()
  const activeCategory = document.querySelector('.active');
  if (activeCategory) {
    activeCategory.classList.remove('active');
  }
  event.target.classList.add('active');

  event.preventDefault();
  // console.dir(event);
  // console.dir(event.target.value);
  // console.dir(event.target.classList);

  // event.target.classList.toggle("active")

  if (event.target.classList.contains('all-categories')) {
    makeBestSellersOneTime(); ///// waiting for import from bestsellersrender
    if (topBooks.innerHTML) {
      topBooks.innerHTML = '';
    }
  } else if (event.target.nodeName !== 'LI') {
    return;
  } else {
    const selectedCategory = event.target.textContent;
    fetch(
      `https://books-backend.p.goit.global/books/category?category=${selectedCategory}`,
      {
        method: 'GET',
        headers: { accept: 'application/json' },
      }
    )
      .then(response => {
        return response.json();
      })
      .then(resData => {
        const removedBestsellersHTML =
          document.querySelector('.render-container');
        const removedChosenHTML = document.querySelector('.book-gallery');
        if (removedBestsellersHTML) {
          removedBestsellersHTML.innerHTML = '';
        }
        if (removedChosenHTML) {
          removedChosenHTML.innerHtml = '';
        }

        //   const chosen = document.querySelector('.chosen');
        const markup = resData.map(buildTopBooksMarkup).join('');
        removedChosenHTML.innerHTML = markup;

        try {
          const categoriesTitle = document.querySelector('.title-best-sellers');
          categoriesTitle.innerHTML = `<h2 class="title-best-sellers">${event.target.innerHTML
            .trim()
            .split(' ')
            .slice(0, length - 1)
            .join(
              ' '
            )} <span class="title-best-sellers-color">${event.target.innerHTML
            .trim()
            .split(' ')
            .pop()}</span></h2>`;
        } catch (error) {}
      });

    function buildTopBooksMarkup({
      list_name,
      title,
      author,
      book_image,
      _id,
    }) {
      return `
      <li class="item-category-book" data-book-id="${_id}">
        <a class="link-books-render" href="#" onclick="event.preventDefault()">
          
            <div class="img-card-book">
              <img src="${book_image}" alt="book" class="img-book">
              
            </div>
            <div class="book-info">
              
                <p class="title-book">${title}</p>
              
              
                <p class="author-book">${author}</p>
             
            </div>
          
        </a>
      </li>
    
    `;
    }
  }
}

async function makeBestSellersOneTime() {
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
