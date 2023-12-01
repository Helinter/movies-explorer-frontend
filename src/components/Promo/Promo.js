import logo from '../../images/text__COLOR_landing-logo.svg';
function Promo() {
  return (
    <div className="promo">
      <div className="promo__container">
<h1 className="promo__container__title">Учебный проект студента факультета<br></br>Веб-разработки.</h1>
<p className="promo__container__subtitle">Листайте ниже, чтобы узнать больше про этот<br></br>проект и его создателя.</p>

            <button className="promo__container__button">Узнать больше</button>

      </div>
     <img alt="weblogo" src={logo} className="promo__logo"/>
    </div>
  );
}

export default Promo;