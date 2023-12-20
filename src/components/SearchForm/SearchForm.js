import React, { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';

function SearchForm({ setIsFinded, setMovies, isFinded, initialMoviesData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [shortFilm, setShortFilm] = useState(false);
  const [moviesData, setMoviesData] = useState([]);

  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  useEffect(() => {
    // Восстановление данных из localStorage при монтировании компонента
    const savedSearchQuery = localStorage.getItem('searchQuery');
    const savedShortFilm = localStorage.getItem('shortFilm');
  
    if (!isSavedMoviesPage && savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }
  
    if (!isSavedMoviesPage && savedShortFilm) {
      setShortFilm(savedShortFilm ? JSON.parse(savedShortFilm) : false);
    }
  
    // Обновление данных сразу после восстановления
    filterMovies();
  
    // Общая логика для обновления moviesData
    setMoviesData(initialMoviesData);
  }, [initialMoviesData, isSavedMoviesPage]);
  

  useEffect(() => {
    filterMovies();
  }, [shortFilm, isFinded]);

  const filterMovies = () => {
    const filteredMovies = moviesData.filter(movie =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const finalFilteredMovies = shortFilm ? filteredMovies.filter(movie => movie.duration <= 40) : filteredMovies;

    setMovies(finalFilteredMovies);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      setIsFinded(searchQuery);
    }

    // Сохранение данных в localStorage при сабмите формы
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('shortFilm', shortFilm.toString());
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckboxChange = () => {
    const newShortFilm = !shortFilm;
    setShortFilm(newShortFilm);
    
    // Сохранение актуального значения чекбокса в localStorage
    localStorage.setItem('shortFilm', newShortFilm.toString());
  };

  return (
    <>
      <section className="searchForm">
        <form onSubmit={handleSearch}>
          <div className="searchForm__input__container">
            <input
              className="searchForm__input"
              minLength="2"
              maxLength="30"
              type="text"
              name="searchForm"
              placeholder="Фильм"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button className="searchForm__button" type="submit">
              Поиск
            </button>
          </div>
          <FilterCheckbox isChecked={shortFilm} onCheckboxChange={handleCheckboxChange} />
        </form>
      </section>
    </>
  );
}

export default SearchForm;