import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  const cardListClass = isSavedMoviesPage ? 'savedMoviesCardList' : 'moviesCardList';
  const numberOfCardsToRender = isSavedMoviesPage ? 3 : 12;

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
