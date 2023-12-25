import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { api } from '../../utils/MainApi';

function SavedMovies({isLogedin, hasSearchedOnce, setHasSearchedOnce}) {
  const [isFinded, setIsFinded] = useState('');
  const [moviesData, setMoviesData] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedMoviesData = await api.getSavedMovies();
        setMoviesData(fetchedMoviesData);
        setMovies(fetchedMoviesData); // Устанавливаем все карточки при получении данных
        setLoading(false);
      } catch (error) {
        console.error('Error fetching saved movies:', error);
        setLoading(false);
      }
    };

    if (moviesData!=='[]') {
      fetchData();
    }
  }, []);

  return (
    <>
      <Header isLogedin={isLogedin}/>
      <section className="savedMovies">
        <SearchForm
          setIsFinded={setIsFinded}
          setMovies={setMovies}
          setLoading={setLoading}
          initialMoviesData={moviesData} 
          isFinded={isFinded}
          setHasSearchedOnce={setHasSearchedOnce}
          hasSearchedOnce={hasSearchedOnce}
        />
        <MoviesCardList
          movies={movies}
          loading={loading}
          isFinded={isFinded}
          setMovies={setMovies}
        />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
