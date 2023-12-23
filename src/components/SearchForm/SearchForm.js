import React, { useState, useEffect, useCallback } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';

function SearchForm({ setIsFinded, setMovies, isFinded, initialMoviesData }) {
  const [shortFilm, setShortFilm] = useState(false);
  const [moviesData, setMoviesData] = useState([]);
  const [inputValue, setInputValue] = useState(isFinded || ''); 

  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  const filterMovies = useCallback(() => {
    const filteredMovies = moviesData.filter(movie =>
      movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(inputValue.toLowerCase())
    );

    const finalFilteredMovies = shortFilm ? filteredMovies.filter(movie => movie.duration <= 40) : filteredMovies;

    setMovies(finalFilteredMovies);
  }, [moviesData, isFinded, shortFilm, setMovies]);

  useEffect(() => {
    // Восстановление данных из localStorage при монтировании компонента
    const savedSearchQuery = localStorage.getItem('isFinded');
    const savedShortFilm = localStorage.getItem('shortFilm');

    if (!isSavedMoviesPage && savedSearchQuery) {
      setIsFinded(savedSearchQuery);
      setShortFilm(savedShortFilm ? JSON.parse(savedShortFilm) : false);
      setInputValue(savedSearchQuery); // Установим значение в инпуте
    } else {
      setIsFinded('');
    }

    setMoviesData(initialMoviesData);
  }, [initialMoviesData, isSavedMoviesPage, setIsFinded]);

  useEffect(() => {
    filterMovies();
  }, [filterMovies, inputValue, shortFilm]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (inputValue !== '') {
      setIsFinded(inputValue);
      if (!isSavedMoviesPage) {
        localStorage.setItem('isFinded', inputValue);
        localStorage.setItem('shortFilm', shortFilm.toString());
      }
    }
  };
  
  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCheckboxChange = () => {
    const newShortFilm = !shortFilm;
    setShortFilm(newShortFilm);

    localStorage.setItem('shortFilm', newShortFilm.toString());
  };

  return (
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
            onChange={handleInputChange}
            value={inputValue}
          />
          <button className="searchForm__button" type="submit">
            Поиск
          </button>
        </div>
        <FilterCheckbox isChecked={shortFilm} onCheckboxChange={handleCheckboxChange} />
      </form>
    </section>
  );
}

export default SearchForm;
