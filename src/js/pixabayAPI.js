import axios from 'axios';
export default class PixabayAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  BASE_URL = 'https://pixabay.com/api/';
  API_KEY = '20889141-879292f7de0589dc14ea8950f';

  searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  async getImages() {
    const url = `${this.BASE_URL}?key=${this.API_KEY}&q=${this.searchQuery}&${this.searchParams}&page=${this.page}&per_page=${this.per_page}`;
    try {
      const response = await axios.get(url);
      console.log(response);
      this.page += 1;
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  updatePage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
