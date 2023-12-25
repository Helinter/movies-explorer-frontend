import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';
import { api } from '../../utils/MainApi';

function Movies({ isLogedin }) {
  const [isFinded, setIsFinded] = useState('');
  const [moviesData, setMoviesData] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [hasSearchedOnce, setHasSearchedOnce] = useState(false);


  
  useEffect(() => {
    const fetchSavedMovies = async () => {
      try {
        const fetchedSavedMoviesData = await api.getSavedMovies();
        setSavedMovies(fetchedSavedMoviesData);
      } catch (error) {
        console.error('Ошибка при получении сохраненных фильмов:', error);
      }
    };
if(savedMovies!=='[]'){
  fetchSavedMovies();
}
   
  }, []);


  useEffect(() => {
    // При монтировании компонента читаем данные из локального хранилища
    const localMoviesData = localStorage.getItem('moviesData');

    if (localMoviesData) {
      setMoviesData(JSON.parse(localMoviesData));
      setMovies(JSON.parse(localMoviesData));  // Устанавливаем данные из локального хранилища в movies
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedMoviesData = await moviesApi.getMovies();
        setMoviesData(fetchedMoviesData);

        // Сохраняем данные в localStorage
        localStorage.setItem('moviesData', JSON.stringify(fetchedMoviesData));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    if (hasSearchedOnce) {
      // При монтировании проверяем localStorage
      const localMoviesData = localStorage.getItem('moviesData');

      if (localMoviesData) {
        setMoviesData(JSON.parse(localMoviesData));
        setMovies(JSON.parse(localMoviesData));  // Устанавливаем данные из локального хранилища в movies
      } else {
        fetchData();
      }
    }
  }, [setLoading, setMoviesData, hasSearchedOnce]);

  return (
    <>
      <Header isLogedin={isLogedin} />
      <section className="movies">
        <SearchForm
          setIsFinded={setIsFinded}
          setMovies={setMovies}
          setLoading={setLoading}
          initialMoviesData={moviesData}
          isFinded={isFinded}
          setHasSearchedOnce={setHasSearchedOnce}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
        />
        <MoviesCardList
          movies={movies}
          loading={loading}
          isFinded={isFinded}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
