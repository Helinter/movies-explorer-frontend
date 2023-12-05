import logo from '../../images/text__COLOR_landing-logo.svg';
function Promo() {
  return (
    <div className="promo">
      <div className="promo__container">
<h1 className="promo__container__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
<p className="promo__container__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>

            <button className="promo__container__button">Узнать больше</button>

      </div>
     <img className="promo__logo" alt="weblogo" src={logo} />
    </div>
  );
}

export default Promo;