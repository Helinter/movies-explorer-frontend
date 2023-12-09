import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__subtitle">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__container-text">© 2023</p>
        <p className="footer__container-text">
          <a  style={{ textDecoration: 'none', color: 'inherit' }} href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">
            Яндекс.Практикум
          </a>
        </p>
        <p className="footer__container-text">
          <a  style={{ textDecoration: 'none', color: 'inherit' }} href="https://github.com/" target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
