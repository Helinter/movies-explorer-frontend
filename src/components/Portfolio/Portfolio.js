function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__container">
        <li className="portfolio__container-item">
        <a target="_blank" rel="noreferrer" className="portfolio__container-item-link" href="https://github.com/Helinter/how-to-learn">
          <p className="portfolio__container-item-title">Статичный сайт</p>
          <div className="portfolio__container-item-arrow"  ></div>
        </a></li>
        <li className="portfolio__container-item"><a target="_blank" rel="noreferrer" className="portfolio__container-item-link" href="https://helinter.github.io/russian-travel/">
          <p className="portfolio__container-item-title">Адаптивный сайт</p>
          <div className="portfolio__container-item-arrow"  ></div>
        </a></li>
        <li className="portfolio__container-item"><a target="_blank" rel="noreferrer" className="portfolio__container-item-link" href="https://daragan.dev.nomoredomainsmonster.ru/">
          <p className="portfolio__container-item-title">Одностраничное приложение</p>
          <div className="portfolio__container-item-arrow"  ></div>
        </a></li>
      </ul>
    </section>
  );
}

export default Portfolio;
