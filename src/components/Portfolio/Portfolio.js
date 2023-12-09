function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <div className="portfolio__container">
        <div className="portfolio__container-item">
          <p className="portfolio__container-item-title">Статичный сайт</p>
          <a target="_blank" className="portfolio__container-item-link" href="https://github.com/Helinter/how-to-learn" ></a>
        </div>
        <div className="portfolio__container-line"></div>
        <div className="portfolio__container-item">
          <p className="portfolio__container-item-title">Адаптивный сайт</p>
          <a target="_blank" className="portfolio__container-item-link" href="https://helinter.github.io/russian-travel/" ></a>
        </div>
        <div className="portfolio__container-line"></div>
        <div className="portfolio__container-item">
          <p className="portfolio__container-item-title">Одностраничное приложение</p>
          <a target="_blank" className="portfolio__container-item-link" href="https://daragan.dev.nomoredomainsmonster.ru/" ></a>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
