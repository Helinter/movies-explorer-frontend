import React, { useState, useEffect, useCallback } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';
import { useFormWithValidation } from '../FormValidator/FormValidator';

function SearchForm({ setIsFinded, setMovies, isFinded, initialMoviesData }) {
  const [shortFilm, setShortFilm] = useState(false);
  const [moviesData, setMoviesData] = useState([]);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const { values, handleChange, isValid, resetForm, validateSearch } = useFormWithValidation();

  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  const filterMovies = useCallback(() => {
    const filteredMovies = moviesData.filter(movie =>
      movie.nameRU.toLowerCase().includes(values.searchForm.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(values.searchForm.toLowerCase())
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
      resetForm({ searchForm: savedSearchQuery }); // Установим значение в инпуте и сбросим ошибки
    } else {
      setIsFinded('');
    }

    setMoviesData(initialMoviesData);
  }, [initialMoviesData, isSavedMoviesPage, setIsFinded, resetForm]);

  useEffect(() => {
    filterMovies();
  }, [filterMovies, values.searchForm, shortFilm]);

  const handleSearch = (event) => {
    event.preventDefault();
    setIsSubmitAttempted(true);

    if (isValid) {
      setIsFinded(values.searchForm);
      if (!isSavedMoviesPage) {
        localStorage.setItem('isFinded', values.searchForm);
        localStorage.setItem('shortFilm', shortFilm.toString());
      }
    }
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
            maxLength="30"
            type="text"
            name="searchForm"
            placeholder="Фильм"
            onChange={handleChange}
            value={values.searchForm || ''}
          />
          {isSubmitAttempted && <span className="span">{validateSearch(values.searchForm)}</span>}
          <button className="searchForm__button" type="submit" disabled={values.searchForm===''}>
            Поиск
          </button>
        </div>
        <FilterCheckbox isChecked={shortFilm} onCheckboxChange={handleCheckboxChange} />
      </form>
    </section>
  );
}

export default SearchForm;
