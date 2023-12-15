import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import More from '../More/More'

function MoviesCardList({movies, loading, isFinded}) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  const cardListClass = isSavedMoviesPage ? 'savedMoviesCardList' : 'moviesCardList';
  const [numberOfCardsToRender, setNumberOfCardsToRender] = useState(isSavedMoviesPage ? 3 : 12);
  
  

  useEffect(() => {
    const handleResize = () => {
      let newNumberOfCards;
      if (window.innerWidth <= 767) {
        newNumberOfCards = isSavedMoviesPage ? 2 : 5;
      } else if (window.innerWidth <= 1279) {
        newNumberOfCards = isSavedMoviesPage ? 3 : 8;
      } else {
        newNumberOfCards = isSavedMoviesPage ? 3 : 12;
      }

      setNumberOfCardsToRender(newNumberOfCards);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSavedMoviesPage]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
        <ul className={cardListClass}>
          {movies.slice(0, numberOfCardsToRender).map((movie, index) => (
            <li key={index}>
              <MoviesCard movie={movie} />
            </li>
          ))}
        </ul>
        {isFinded !=='' && <More showButton={true}/>}
        </>
      )}
    </>
  );
}

export default MoviesCardList;
