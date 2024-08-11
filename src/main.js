import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import searchImages from './js/pixabay-api.js';
import renderImages from './js/render-functions.js';

const input = document.querySelector('.input');
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentPage = 1;
let search = '';

form.addEventListener('submit', async event => {
  event.preventDefault();

  search = input.value.trim();
  loadMoreBtn.classList.add('is-hidden');
  currentPage = 1;
  if (search === '') {
    iziToast.show({
      title: '❌',
      message: 'Please enter the appropriate search query!',
      messageColor: 'white',
      backgroundColor: 'red',
      position: 'topRight',
    });
    return;
  }
  loader.classList.remove('is-hidden');
  gallery.innerHTML = '';
  // data.hits  - зображення

  try {
    const data = await searchImages(search, currentPage); // Очікуємо результат запиту

    if (data.hits.length === 0) {
      iziToast.show({
        title: '❌',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: 'black',
        backgroundColor: 'orange',
        position: 'topRight',
      });
      return;
    }

    renderImages(data.hits);
    smoothScroll();
    form.reset();

    if (data.totalHits > 15) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    iziToast.show({
      title: '❌',
      message: error.message,
      messageColor: 'black',
      backgroundColor: 'red',
      position: 'topRight',
    });
  } finally {
    loader.classList.add('is-hidden');
  }
});

loadMoreBtn.addEventListener('click', onLoadMore);

async function onLoadMore() {
  currentPage++;
  loader.classList.remove('is-hidden');

  try {
    const data = await searchImages(search, currentPage);
    renderImages(data.hits);

    smoothScroll();

    const maxPages = Math.ceil(data.totalHits / 15);

    if (currentPage === maxPages) {
      loadMoreBtn.classList.add('is-hidden');

      iziToast.show({
        title: '❌',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: 'black',
        backgroundColor: 'light blue',
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.show({
      title: '❌',
      message: error.message,
      messageColor: 'black',
      backgroundColor: 'red',
      position: 'topRight',
    });
  } finally {
    loader.classList.add('is-hidden');
  }
}

function smoothScroll() {
  const { height } = gallery.firstElementChild.getBoundingClientRect(); // висота нашої першої лішки

  window.scrollBy({
    top: height * 2, // висота двох карточок
    behavior: 'smooth',
  });
}