import { useLocation } from 'react-router-dom';

function MoviesCard({ movie }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  const { nameRU, image, trailerLink, duration } = movie;

  // Преобразуем длительность фильма из минут в часы и минуты
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const durationText = `${hours}ч ${minutes}м`;

  // Добавим базовый URL к относительному пути изображения
  const imageUrl = `https://api.nomoreparties.co${image.url}`;

  const handleImageClick = () => {
    window.open(trailerLink, '_blank');
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
            src={imageUrl}
            className="moviesCard__container-image"
            alt="Movie"
            onClick={handleImageClick}
            style={{ cursor: 'pointer' }}
          />
          </a>
          <button type="button" className="moviesCard__button"></button>
        
      </section>
    </>
  );
}

export default MoviesCard;
