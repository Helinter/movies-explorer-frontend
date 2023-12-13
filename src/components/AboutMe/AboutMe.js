import avatar from '../../images/avatar.jpg';

function AboutMe() {
  return (
    <section className="aboutMe">
      <h2 className="aboutMe__title">Студент</h2>
      <div className="aboutMe__container">
        <div className="aboutMe__container-table">
          <p className="aboutMe__container-table-title">Виталий</p>
          <p className="aboutMe__container-table-subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutMe__container-table-description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="aboutMe__container-link" href="https://github.com/Helinter" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
        <img alt="avatar" src={avatar} className="aboutMe__container-avatar"></img>
      </div>
    </section>
  );
}

export default AboutMe;
