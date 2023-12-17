import { apiConfig } from './constants';
import { getToken, setToken } from '../components/TokenHelper/TokenHelper';

export class Api {
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

  // Метод для обновления заголовков с токеном
  _updateHeaders() {
    return {
      ...this.headers,
      'Authorization': `Bearer ${getToken()}`,
    };
  }

   // Метод для проверки валидности токена
   async checkToken(token) {
    const res = await fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return this._checkResponse(res);
  }  

  async getUserInfo() {
    const token = sessionStorage.getItem('token');
  
    if (!token) {
      return Promise.reject('Токен отсутствует');
    }

    const res = await fetch(`${this.url}/users/me`, {
      headers: this._updateHeaders(),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  
    console.error(`Ошибка: ${res.status}`);
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  

    // Метод для обновления информации о пользователе на сервере
    async updateUserInfo(name, email) {
   
      const res = await fetch(`${this.url}/users/me`, {
        method: 'PATCH',
        headers: this._updateHeaders(),
        body: JSON.stringify({
          name: name,
          email: email,
        })
      });
  
      const data = await this._checkResponse(res);
      return data;
    }

  // Метод для получения карточек с сервера
  async getSavedMovies() {
    const token = sessionStorage.getItem('token');
  
    if (!token) {
      return Promise.reject('Токен отсутствует');
    }
    const res = await fetch(`${this.url}/movies`, {
      method: 'GET',
      headers: this._updateHeaders(),
    });
    return this._checkResponse(res);
  }

  // Метод для добавления новой карточки на сервер
  async createMovie(movie) {
    const baseUrl = 'https://api.nomoreparties.co';
    const res = await fetch(`${this.url}/movies`, {
      method: 'POST',
      headers: this._updateHeaders(),
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: baseUrl + movie.image.url,
        trailer: movie.trailerLink,
        thumbnail: baseUrl + movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        owner: movie.owner || null,
      }),
    });
    return this._checkResponse(res);
  }
  

  // Метод для удаления карточки с сервера
  async deleteMovie(movieId) {
   
    const res = await fetch(`${this.url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._updateHeaders(),
    });
    return this._checkResponse(res);
  }


  // Метод для регистрации пользователя
  async createUser(name, email, password) {
    const res = await fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this._updateHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    return this._checkResponse(res);
  }

  // Метод для авторизации пользователя
  async login(email, password) {
    const res = await fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this._updateHeaders(),
      body: JSON.stringify({ email, password }),
    });
  
    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
      return data; // Возвращаем токен из успешного ответа сервера
    }
  
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}



export const api = new Api(apiConfig);
