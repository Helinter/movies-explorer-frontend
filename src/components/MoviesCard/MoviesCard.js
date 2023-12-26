import { useLocation } from 'react-router-dom';
import { api } from '../../utils/MainApi';
import { useState, useEffect } from 'react';

function MoviesCard({ movie, onDeleteMovie, savedMoviesData }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  const { nameRU, image, trailerLink, trailer, duration } = movie;

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const durationText = `${hours}ч ${minutes}м`;

  const baseUrl = 'https://api.nomoreparties.co';

  const [isLiked, setIsLiked] = useState(() => {
    if (isSavedMoviesPage) {
      return true;
    } else {
      return savedMoviesData.some(savedMovie => savedMovie.movieId === movie.id);
    }
  });
  
  useEffect(() => {
    if (!isSavedMoviesPage) {
      setIsLiked(savedMoviesData.some(savedMovie => savedMovie.movieId === movie.id));
    }
  }, [savedMoviesData, movie, isSavedMoviesPage]);
  
  const handleImageClick = () => {
    window.open(isSavedMoviesPage ? trailer : trailerLink, '_blank');
  };

  const handleLike = async (movie) => {
    try {
      if (!isLiked) {
        const response = await api.createMovie(movie);
        console.log('Movie created:', response);
        setIsLiked(true);
      } else {
        if (isSavedMoviesPage) {
          const response = await api.deleteMovie(movie._id);
          console.log('Movie removed:', response);
          onDeleteMovie(movie._id);
        } else {
          try {
            const fetchedSavedMoviesData = await api.getSavedMovies();
            const movieToDelete = fetchedSavedMoviesData.find(savedMovie => savedMovie.movieId === movie.id);
            setIsLiked(false);
            if (movieToDelete) {
              const response = await api.deleteMovie(movieToDelete._id);
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
        <a href={isSavedMoviesPage ? trailer : `${baseUrl + movie.image.url}`} target="_blank" rel="noopener noreferrer">
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
