fetch('https://books-backend.p.goit.global/books/category-list', {
  method: 'GET',
  headers: { accept: 'application/json' },
})
  .then(response => {
    return response.json();
  })
  .then(resData => {
    const categoriesList = document.querySelector('.categories-list');
    const markup = resData.map(buildCategoriesListMarkup).join('');
    categoriesList.insertAdjacentHTML('beforeend', markup);
  });

function buildCategoriesListMarkup({ list_name }) {
  const listName = list_name;
  return `
         <li class="categories-item">${listName}</li>
    `;
}

export async function makeCategoriesListArray() {
  let categoriesArray = '';
  await fetch('https://books-backend.p.goit.global/books/category-list', {
    method: 'GET',
    headers: { accept: 'application/json' },
  })
    .then(response => {
      return response.json();
    })
    .then(resData => {
      resData.map(createCategoriesPull);

      function createCategoriesPull() {
        for (let i = 0; i < resData.length; i += 1) {
          categoriesArray += resData[i].list_name;
          return categoriesArray;
        }
      }
      return categoriesArray;
    });
}

const categoriesBlock = document.querySelector('.categories-item');
const allCategoriesItems = document.querySelectorAll('.categories-item');

categoriesBlock.addEventListener('click', makeActive);
function makeActive() {
  allCategoriesItems.forEach(itemCategory => {
    itemCategory.addEventListener('click', event => {
      const activeCategory = document.querySelector('.active');
      if (activeCategory) {
        activeCategory.classList.remove('active');
      }
      event.target.classList.add('active');
    });
  });
}
