import { Link, NavLink, useLocation } from 'react-router-dom';

import { useState } from 'react';  // Добавьте импорт useState

function Navigation() {
  const isLoggedIn = true; // Замените на вашу логику проверки аутентификации
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  // Используйте useState для отслеживания состояния isContainerActive
  const [isContainerActive, setIsContainerActive] = useState(false);

  const buttonToggle = () => {
    const navMenu = document.querySelector('.navigation');
    const menuButton = document.querySelector('.navigation__menu-button');
    const profileicon = document.querySelector('.navigation__profile-icon-container-main');

    // Переключение класса на элементе .navigation
    navMenu.classList.toggle('navigation_active');

    // Переключение класса на элементе .navigation__menu-button
    menuButton.classList.toggle('navigation__menu-button_active');

    if (profileicon) {
      profileicon.classList.toggle('navigation__profile-icon-container-main_active');
    }

    // Обновление состояния на основе текущего состояния
    setIsContainerActive((prev) => !prev);
  }

  return (
    <>
      {isContainerActive && (
        <div className="overlay"></div>
      )}

      {isLoggedIn ? (
        <div className={`navigation ${isContainerActive ? 'navigation_active' : ''}`}>
          {isContainerActive && (
            <NavLink className="navigation__link" to="/" activeClassName="header__link_active">
              Главная
            </NavLink>
          )}
          <NavLink className="navigation__link" to="/movies">
            Фильмы
          </NavLink>
          <NavLink
            className="navigation__link"
            to="/saved-movies"
          >
            Сохранённые фильмы
          </NavLink>
          <button className="navigation__menu-button" onClick={buttonToggle}></button>
          <NavLink className="navigation__link" to="/profile">
            <div className="navigation__profile">
              <p className="navigation__profile-text">Аккаунт</p>
              <div className={`navigation__profile-icon-container${isMainPage ? '-main' : ''}`}>
                <div className="navigation__profile-icon"></div>
              </div>
            </div>
          </NavLink>
        </div>
      ) : (
        <>
          <Link className="header__link" to="/signup">
            Регистрация
          </Link>
          <Link to="/signin">
            <button className="header__button">Войти</button>
          </Link>
        </>
      )}
    </>
  );
}

export default Navigation;
