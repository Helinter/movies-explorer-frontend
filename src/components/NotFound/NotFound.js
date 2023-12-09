import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Переход на предыдущую страницу
    navigate(-1);
  };

  return (
    <section className="NotFound">
      <h1 className="NotFound__title">404</h1>
      <p className="NotFound__subtitle">Страница не найдена</p>
      <Link className="NotFound__link" onClick={handleGoBack}>
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
