import axios from 'axios';
export default class PixabayAPI {
  constructor() {
    this.searchQuery = '';
  }

  BASE_URL = 'https://pixabay.com/api/';
  API_KEY = '20889141-879292f7de0589dc14ea8950f';

  searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  async getImages() {
    const url = `${this.BASE_URL}?key=${this.API_KEY}&q=${this.searchQuery}&${this.searchParams}&page=1&per_page=40`;
    try {
      const response = await axios.get(url);

      const images = response.json();
      return images;
    } catch (error) {
      return error;
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
