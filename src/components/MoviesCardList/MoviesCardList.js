import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import More from '../More/More';


function MoviesCardList({ savedMovies, movies, loading, isFinded, shortFilm, setMovies }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  const cardListClass = isSavedMoviesPage ? 'savedMoviesCardList' : 'moviesCardList';
  const cardsPerPage = 12;

  const [totalCards, setTotalCards] = useState(0);
  const [visibleCards, setVisibleCards] = useState(cardsPerPage);

  useEffect(() => {
    const handleResize = () => {
      let newVisibleCards;
      if (window.innerWidth <= 767) {
        newVisibleCards = isSavedMoviesPage ? movies.length : 5;
      } else if (window.innerWidth <= 1279) {
        newVisibleCards = isSavedMoviesPage ? movies.length : 8;
      } else {
        newVisibleCards = isSavedMoviesPage ? movies.length : 12;
      }

      setVisibleCards(newVisibleCards);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSavedMoviesPage, movies.length]);
  

  useEffect(() => {
    setTotalCards(movies.length);
  }, [movies]);

  useEffect(() => {
    // Сбрасываем видимые карточки при изменении isFinded
    setVisibleCards(cardsPerPage);
  }, [isFinded]);

  const handleShowMore = () => {
    let additionalCards;
    if (window.innerWidth > 1279) {
      additionalCards = 3;
    } else {
      additionalCards = 2;
    }
  
    // При нажатии на кнопку "Еще" увеличиваем количество видимых карточек
    setVisibleCards(prevVisibleCards => prevVisibleCards + additionalCards);
  };

  const handleDeleteMovie = (movieId) => {
    // Фильтруем список фильмов, исключая удаленный
    const updatedMovies = movies.filter(movie => movie._id !== movieId);
    setTotalCards(updatedMovies.length);
    setMovies(updatedMovies); // Обновляем состояние movies
  };

  return (
    <>
      {(isSavedMoviesPage || (isFinded !== '' && !loading)) ? (
        <>
          <ul className={cardListClass}>
            {movies
              .filter(movie => !shortFilm || (shortFilm && movie.duration <= 40))
              .slice(0, visibleCards)
              .map((movie, index) => (
                <li key={index}>
                  <MoviesCard movie={movie} onDeleteMovie={handleDeleteMovie} savedMoviesData={savedMovies} />
                </li>
              ))}
          </ul>
          {!isSavedMoviesPage && isFinded !== '' && visibleCards < totalCards && (
            <More showButton={true} onClick={handleShowMore} />
          )}
        </>
      ) : null}
      {loading && <Preloader />}
    </>
  );
}

export default MoviesCardList;