import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import More from '../More/More';

function MoviesCardList({ movies, loading, isFinded, shortFilm }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  const cardListClass = isSavedMoviesPage ? 'savedMoviesCardList' : 'moviesCardList';
  const cardsPerPage = isSavedMoviesPage ? 3 : 12;

  const [totalCards, setTotalCards] = useState(0);
  const [visibleCards, setVisibleCards] = useState(cardsPerPage);

  useEffect(() => {
    const handleResize = () => {
      let newVisibleCards;
      if (window.innerWidth <= 767) {
        newVisibleCards = isSavedMoviesPage ? 2 : 5;
      } else if (window.innerWidth <= 1279) {
        newVisibleCards = isSavedMoviesPage ? 3 : 8;
      } else {
        newVisibleCards = isSavedMoviesPage ? 3 : 12;
      }

      setVisibleCards(newVisibleCards);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSavedMoviesPage]);

  useEffect(() => {
    setTotalCards(movies.length);
  }, [movies]);

  useEffect(() => {
    // Сбрасываем видимые карточки при изменении isFinded
    setVisibleCards(cardsPerPage);
  }, [isFinded]);

  const handleShowMore = () => {
    // При нажатии на кнопку "Еще" увеличиваем количество видимых карточек
    setVisibleCards(prevVisibleCards => prevVisibleCards + cardsPerPage);
  };

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <ul className={cardListClass}>
            {movies
              .filter(movie => !shortFilm || (shortFilm && movie.duration <= 40))
              .slice(0, visibleCards)
              .map((movie, index) => (
                <li key={index}>
                  <MoviesCard movie={movie} />
                </li>
              ))}
          </ul>
          {!isSavedMoviesPage && isFinded !== '' && visibleCards < totalCards && (
            <More showButton={true} onClick={handleShowMore} />
          )}
        </>
      )}
    </>
  );
}

export default MoviesCardList;