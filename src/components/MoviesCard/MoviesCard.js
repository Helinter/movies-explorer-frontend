import { useLocation } from 'react-router-dom';
import { api } from '../../utils/MainApi';
import { useState, useEffect } from 'react';

function MoviesCard({ movie, onDeleteMovie }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  const { nameRU, image, trailerLink, duration } = movie;

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const durationText = `${hours}ч ${minutes}м`;

  const baseUrl = 'https://api.nomoreparties.co';

  const [isLiked, setIsLiked] = useState(isSavedMoviesPage ? true : false); // Состояние для отслеживания сохранения фильма


  const handleImageClick = () => {
    window.open(trailerLink, '_blank');
  };

  const handleLike = async (movie) => {
    try {
      if (!isLiked) {
        const response = await api.createMovie(movie);
        console.log('Movie created:', response);
        setIsLiked(!isLiked);
      } else {
        if (isSavedMoviesPage) {
          const response = await api.deleteMovie(movie._id);
          console.log('Movie removed:', response);
          onDeleteMovie(movie._id);
        } else {
          setIsLiked(!isLiked);
          try {
            const fetchedSavedMoviesData = await api.getSavedMovies();
            const indexToRemove = fetchedSavedMoviesData.findIndex(savedMovie => savedMovie.movieId === movie.id);
            if (indexToRemove !== -1) {
              const response = await api.deleteMovie(fetchedSavedMoviesData[indexToRemove]._id);
              console.log('Movie removed:', response);
            } else {
              console.log('не найдено');
            }
          } catch (error) {
            console.error('Error fetching saved movies:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error handling like:', error);
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
            src={isSavedMoviesPage ? `${image}` : `${baseUrl + movie.image.url}`}
            className="moviesCard__container-image"
            alt="Movie"
            onClick={handleImageClick}
            style={{ cursor: 'pointer' }}
          />
        </a>
        <button
          type="button"
          className={`moviesCard__button${isLiked ? ' moviesCard__button-active' : ''}`}
          onClick={() => handleLike(movie)}
        >
          {isLiked ? '' : 'Сохранить'}
        </button>
      </section>
    </>
  );
}

export default MoviesCard;
