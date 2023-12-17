import { useLocation } from 'react-router-dom';
import { api } from '../../utils/MainApi'

function MoviesCard({ movie }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  const { nameRU, image, trailerLink, duration } = movie;

  // Преобразуем длительность фильма из минут в часы и минуты
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const durationText = `${hours}ч ${minutes}м`;

  const baseUrl = 'https://api.nomoreparties.co';

  const handleImageClick = () => {
    window.open(trailerLink, '_blank');
  };

  const handleLike = async (movie) => { 
    try {
      console.log('фильм: ', movie)
      
      const response = await api.createMovie(movie);
      console.log('Movie created:', response);
    } catch (error) {
      console.error('Error creating movie:', error);
    }
  };

return (
  <>
    <section className={`moviesCard${isSavedMoviesPage ? ' savedMoviesCard' : ''}`}>
      <div className="moviesCard__description">
        <p className="moviesCard__description__name">{nameRU}</p>
        <p className="moviesCard__description__time">{durationText}</p>
      </div>
      <a href={trailerLink} target="_blank" rel="noopener noreferrer">
        <img
         src={isSavedMoviesPage? `${image}` : `${baseUrl + movie.image.url}`}
          className="moviesCard__container-image"
          alt="Movie"
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
      </a>
      <button type="button" className="moviesCard__button" onClick={() => handleLike(movie)}></button>

    </section>
  </>
);
}

export default MoviesCard;
