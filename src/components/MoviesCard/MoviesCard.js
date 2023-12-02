import image from '../../images/Benksy.jpg'

function MoviesCard() {
  return (
  <>
    <div className="moviesCard">
      <div className="moviesCard__description">
        <p className="moviesCard__description__name">В погоне за Бенкси</p>
        <p className="moviesCard__description__time">0ч 42м </p>
      </div>
      <img src={image} className="moviesCard__image"></img>
      <button type="button" className="moviesCard__button"></button>
    </div>
  </>
  );
}

export default MoviesCard;