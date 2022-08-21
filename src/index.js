import PixabayAPI from './js/pixabayAPI';
// import './css/styles.css';
const axios = require('axios').default;
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  btn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.btn.addEventListener('click', onBtnClick);

const pixabayAPI = new PixabayAPI();

async function onFormSubmit(evt) {
  evt.preventDefault();
  refs.gallery.innerHTML = '';
  pixabayAPI.query = evt.currentTarget.elements.searchQuery.value.trim();
  pixabayAPI.getImages();
}

async function onBtnClick(evt) {
  pixabayAPI.getImages(searchQuery);
}
function renderMarkup(images) {
  const markup = images
    .map(image => {
      return `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
    })
    .join('');
  refs.gallery.innerHTML = markup;
}

// fetchImages().then(image => {
//   console.log(image);
// });
