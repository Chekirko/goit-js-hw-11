import PixabayAPI from './js/pixabayAPI';
import './css/styles.css';
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
  pixabayAPI.updatePage();

  try {
    if (!pixabayAPI.query) {
      refs.gallery.innerHTML = '';
      Notiflix.Notify.failure('Sorry, enter the query');
      return;
    }

    const response = await pixabayAPI.getImages();

    if (response.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else {
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      renderMarkup(response.hits);
    }
  } catch (error) {
    console.log(error);
  }
}

async function onBtnClick(evt) {
  pixabayAPI.getImages(searchQuery);
}

function renderMarkup(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
                    <a class="photo-link" href="${largeImageURL}">  
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    </a>
                    <div class="info">
                      <p class="info-item">
                        <b>Likes</b> ${likes}
                      </p>
                      <p class="info-item">
                        <b>Views</b> ${views}
                      </p>
                      <p class="info-item">
                        <b>Comments</b> ${comments}
                      </p>
                      <p class="info-item">
                        <b>Downloads</b> ${downloads}
                      </p>
                    </div>
                </div>`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightboxGallery.refresh();
}

// fetchImages().then(image => {
//   console.log(image);
// });
