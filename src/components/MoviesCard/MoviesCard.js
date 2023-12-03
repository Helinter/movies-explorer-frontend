import { useLocation } from 'react-router-dom';
import image from '../../images/Benksy.jpg';

function MoviesCard() {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  return (
    <>
      <div className={`moviesCard${isSavedMoviesPage ? ' savedMoviesCard' : ''}`}>
        <div className="moviesCard__description">
          <p className="moviesCard__description__name">В погоне за Бенкси</p>
          <p className="moviesCard__description__time">0ч 42м</p>
        </div>
        <img src={image} className="moviesCard__image" alt="Movie"></img>
        <button type="button" className="moviesCard__button"></button>
      </div>
    </>
  );
}

export default MoviesCard;
