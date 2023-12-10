import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';

function MoviesCardList() {
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
    <ul className={cardListClass}>
      {[...Array(numberOfCardsToRender)].map((_, index) => (
        <li key={index}>
          <MoviesCard />
        </li>
      ))}
    </ul>
  );
}

export default MoviesCardList;
