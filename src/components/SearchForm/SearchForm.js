import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { moviesApi } from '../../utils/MoviesApi';
import { useState, useEffect } from 'react';

function SearchForm({ setIsFinded, setMovies, setLoading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [shortFilm, setShortFilm] = useState(false);
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    // Выполнять фильтрацию при изменении данных фильмов или состояния чекбокса
    filterMovies();
  }, [moviesData, shortFilm]);

  const filterMovies = () => {
    const filteredMovies = moviesData.filter(movie =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const finalFilteredMovies = shortFilm ? filteredMovies.filter(movie => movie.duration <= 40) : filteredMovies;

    setMovies(finalFilteredMovies);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    // Проверка, что пользователь ввел хоть что-то в инпут
    if (searchQuery.trim() !== '') {
      try {
        setLoading(true);
        const fetchedMoviesData = await moviesApi.getMovies();
        setMoviesData(fetchedMoviesData);
        setIsFinded(searchQuery);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
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
