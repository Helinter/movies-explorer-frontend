import avatar from '../../images/avatar.jpg';

function AboutMe() {
  return (
    <div className="aboutMe">
      <p className="aboutMe__title">Студент</p>
      <div className="aboutMe__container">
        <div className="aboutMe__container__table">
          <p className="aboutMe__container__table__title">Виталий</p>
          <p className="aboutMe__container__table__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutMe__container__table__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена<br></br>и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С<br></br>2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-<br></br>разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="aboutMe__container__link" href="https://github.com/Helinter" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
        <img alt="avatar" src={avatar} className="aboutMe__container__avatar"></img>
      </div>
    </div>
  );
}

export default AboutMe;
