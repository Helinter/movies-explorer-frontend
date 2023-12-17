import React, { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ setIsFinded, setMovies, isFinded, initialMoviesData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [shortFilm, setShortFilm] = useState(false);
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    setMoviesData(initialMoviesData);
  }, [initialMoviesData]);

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
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckboxChange = () => {
    setShortFilm(!shortFilm);
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
