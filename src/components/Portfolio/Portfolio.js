function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <div className="portfolio__container">
        <div className="portfolio__item">
          <p className="portfolio__item__title">Статичный сайт</p>
          <a target="_blank" className="portfolio__item__link" href="https://github.com/Helinter/how-to-learn" ></a>
        </div>
        <div className="portfolio__line"></div>
        <div className="portfolio__item">
          <p className="portfolio__item__title">Адаптивный сайт</p>
          <a target="_blank" className="portfolio__item__link" href="https://helinter.github.io/russian-travel/" ></a>
        </div>
        <div className="portfolio__line"></div>
        <div className="portfolio__item">
          <p className="portfolio__item__title">Одностраничное приложение</p>
          <a target="_blank" className="portfolio__item__link" href="https://daragan.dev.nomoredomainsmonster.ru/" ></a>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
