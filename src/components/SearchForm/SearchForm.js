import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { moviesApi } from '../../utils/MoviesApi';
import { useState } from 'react';

function SearchForm() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();

    // Проверка, что пользователь ввел хоть что-то в инпут
    if (searchQuery.trim() !== '') {
      try {
        const movies = await moviesApi.getMovies();
        console.log(movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
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
          <FilterCheckbox />
        </form>
      </section>
    </>
  );
}

export default SearchForm;
