import { moviesApiConfig } from './constants';

export class MoviesApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  // Метод для проверки ответа от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getMovies() {
    const token = localStorage.getItem('token');
  
    if (!token) {
      return Promise.reject('Токен отсутствует');
    }
    const res = await fetch(`${this.url}`, {
      method: 'GET',
    });
    return this._checkResponse(res);
  }
}



export const moviesApi = new MoviesApi(moviesApiConfig);
