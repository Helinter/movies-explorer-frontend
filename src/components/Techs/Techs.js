function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__container">
        <div className="techs__container-table">
          <p className="techs__container-table-title">7 технологий</p>
          <p className="techs__container-table-subtitle">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
        </div>
        <ul className="technology">
          <li className="technology__fit">HTML</li>
          <li className="technology__fit">CSS</li>
          <li className="technology__fit">JS</li>
          <li className="technology__fit">React</li>
          <li className="technology__fit">Git</li>
          <li className="technology__fit">Express.js</li>
          <li className="technology__fit">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
