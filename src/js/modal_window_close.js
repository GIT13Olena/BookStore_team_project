const imgCardBooks = document.querySelectorAll('.img-card-book');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalCloseButton = document.querySelector('.js-modal-close');
const bookDetails = document.querySelector('.book-details');

imgCardBooks.forEach((imgCardBook) => {
    imgCardBook.addEventListener('click', (event) => {
        event.preventDefault();
        // Отримайте дані про книгу, яку ви хочете відобразити в модалці
        const bookId = imgCardBook.parentElement.dataset.bookId;
        const book = getBookById(bookId);

        if (book) {
            // Відобразіть дані про книгу в модалці, тільки якщо вони існують
            displayBookInModal(book);
        } else {
            // Якщо дані про книгу не були знайдені, можливо, ви хочете відобразити повідомлення про помилку
            // Наприклад, в модалці замість контенту
            displayErrorMessageInModal();
        }
    });
});

// Обробник події для закриття модалки
modalCloseButton.addEventListener('click', () => {
    closeModal();
});

function getBookById(bookId) {
    // Отримання даних про книгу за ідентифікатором
    // Можливо, вам знадобиться здійснити запит на сервер або взяти дані з іншого джерела
    // Перевірте, чи дані про книгу зберігаються в localStorage, і якщо так, поверніть їх
    const storedBookData = localStorage.getItem(`bookData_${bookId}`);
    if (storedBookData) {
        return JSON.parse(storedBookData);
    }

    // Якщо дані відсутні, поверніть значення за замовчуванням або здійсніть запит на сервер
    // Приклад:
    return {
        title: 'Назва книги',
        author: 'Автор книги',
        description: 'Опис книги',
        image: 'шлях_до_зображення_книги.jpg',
        buy_links: [
            { url: 'посилання_на_Amazon' },
            { url: 'посилання_на_AppleBooks' },
            { url: 'посилання_на_інший_магазин' },
        ],
        _id: 'ідентифікатор_книги',
        amazon: 'шлях_до_логотипу_Amazon',
        appleBooks: 'шлях_до_логотипу_AppleBooks',
        bookShop: 'шлях_до_логотипу_іншого_магазину',
        // інші властивості книги
    };
}

function displayBookInModal(book) {
    // Очищаємо вміст модалки
    bookDetails.innerHTML = '';

    // Збережіть дані про книгу в localStorage
    localStorage.setItem(`bookData_${book._id}`, JSON.stringify(book));

    // Створюємо HTML для відображення даних про книгу
    const bookHTML = `
        <div class="img-book" style="background-image: url('${book.image}'); background-size: cover;"></div>
        <div class="description-info">
          <h2 class="title-name">${book.title}</h2>
          <h3 class="author-book">${book.author}</h3>
          <p class="description-book">${book.description}</p>
          <ul class="shop-book">
            <li class="name-books-shops">
              <a href="${book.buy_links[0].url}" class="amazon-img">
                <img src="${book.amazon}" alt="logo Amazon">
              </a>
            </li>
            <li class="name-books-shops">
              <a href="${book.buy_links[1].url}">
                <img src="${book.appleBooks}" alt="logo shop">
              </a>
            </li>
            <li class="name-books-shops">
              <a href="${book.buy_links[2].url}">
                <img src="${book.bookShop}" alt="logo shop">
              </a>
            </li>
          </ul>
        </div>
        <button type="submit" class="js-add-to-shopping-list" data-id="${book._id}">Add to Shopping List</button>
    `;

    // Вставляємо HTML в модалку
    bookDetails.insertAdjacentHTML('beforeend', bookHTML);

    // Показуємо модалку
    modal.style.display = 'block';
}

function closeModal() {
    // Ховаємо модалку
    modal.style.display = 'none';
}

