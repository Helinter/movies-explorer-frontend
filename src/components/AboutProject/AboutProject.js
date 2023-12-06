function AboutProject() {
  return (
    <div className="about-project">
      <p className="about-project__title">О проекте</p>
      <div className="about-project__container">
        <div className="about-project__container__table">
          <p className="about-project__container__table__title">Дипломный проект включал 5 этапов</p>
          <p className="about-project__container__table__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__container__table">
          <p className="about-project__container__table__title">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__container__table__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__time">
        <div className="about-project__time-discription-one">
        <p className="about-project__time-week">1 неделя</p>
        <p className="about-project__time-backend">Back-end</p>
        </div>
        <div className="about-project__time-discription-four">
        <p className="about-project__time-month">4 недели</p>
        <p className="about-project__time-frontend">Front-end</p>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;