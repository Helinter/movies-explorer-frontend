import React, { useState, useEffect, useCallback } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';

function SearchForm({ setIsFinded, setMovies, isFinded, initialMoviesData, setHasSearchedOnce, hasSearchedOnce }) {
  const [shortFilm, setShortFilm] = useState(false);
  const [moviesData, setMoviesData] = useState([]);
  const [inputValue, setInputValue] = useState(isFinded || ''); 
  const [spanText, setSpanText] = useState(''); 

  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  const filterMovies = useCallback(() => {
    if (initialMoviesData.length === 0) {
      return;
    }
    const filteredMovies = moviesData.filter(movie =>
      movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(inputValue.toLowerCase())
    );

    const finalFilteredMovies = shortFilm ? filteredMovies.filter(movie => movie.duration <= 40) : filteredMovies;

    setMovies(finalFilteredMovies);

    // Устанавливаем spanText в "Ничего не найдено", если фильмы отсутствуют
    if (finalFilteredMovies.length === 0 && hasSearchedOnce) {
      setSpanText('Ничего не найдено');
    } else {
      setSpanText(''); // Сбрасываем текст, если фильмы есть
    }
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
  

  const handleSearch = (event) => {
    event.preventDefault();
    setSpanText('');
    if (inputValue !== '') {
      setIsFinded(inputValue);
      if (!isSavedMoviesPage) {
        localStorage.setItem('isFinded', inputValue);
        localStorage.setItem('shortFilm', shortFilm.toString());
      }
      if(setHasSearchedOnce){
        setHasSearchedOnce(true);
      }
      
    } else {
      setSpanText('Нужно ввести ключевое слово');
    }
  };
  
  useEffect(() => {
    filterMovies();
  }, [filterMovies, inputValue, shortFilm]);

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
            maxLength="30"
            type="text"
            name="searchForm"
            placeholder="Фильм"
            defaultValue={inputValue}
            onChange={handleInputChange}
          />
          <span className="span">{spanText}</span>
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
