import { gallerysupport } from './gallery-support-Ukraine';

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const carousel = document.querySelector('.carousel-container');
const track = document.querySelector('.track');

const cardsMarkup = createGalleryMarkup(gallerysupport);
track.insertAdjacentHTML('beforeend', cardsMarkup);

function createGalleryMarkup(images) {
  return images
    .map(({ title, url, img, img2 }) => {
      return `
        <li class="card-container"> 
          <a href="${url}"> 
              <img 
                class="card card1" 
                srcset="${img} 1x, ${img2} 2x"
                src="${img}" 
              /> 
          </a> 
        </li>
    `;
    })
    .join('');
}

let height = carousel.offsetHeight;
let index = 0;

window.addEventListener('resize', function () {
  height = carousel.offsetHeight;
});

next.addEventListener('click', function (e) {
  e.preventDefault();
  index++;
  if (index > 1) {
    // Після другого кліку встановлюємо індекс на 0
    index = 0;
  }
  track.style.transform = 'translateY(' + index * -height + 'px)';
  toggleButtons();
});

prev.addEventListener('click', function (e) {
  e.preventDefault();
  index--;
  if (index < 0) {
    index = gallerysupport.length - 1;
  }
  track.style.transform = 'translateY(' + index * -height + 'px)';
  toggleButtons();
});

function toggleButtons() {
  prev.classList.toggle('hide', index === 0);
  next.classList.toggle('hide', index === gallerysupport.length - 1);
}
