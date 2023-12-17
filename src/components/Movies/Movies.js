import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';

function Movies() {
  const [isFinded, setIsFinded] = useState('');
  const [moviesData, setMoviesData] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedMoviesData = await moviesApi.getMovies();
        setMoviesData(fetchedMoviesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    if (!moviesData.length) {
      fetchData();
    }
  }, [setLoading, moviesData, setMoviesData]);

  return (
    <>
      <Header />
      <section className="movies">
        <SearchForm
          setIsFinded={setIsFinded}
          setMovies={setMovies}
          setLoading={setLoading}
          initialMoviesData={moviesData}
          isFinded={isFinded}
        />
        <MoviesCardList
          movies={movies}
          loading={loading}
          isFinded={isFinded}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
