import { Link, NavLink, useLocation  } from 'react-router-dom';

function Navigation() {
  const isLoggedIn = true;
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <>
      {isLoggedIn ? (
        <div className="navigation__container">
          <NavLink className="navigation__link" to="/movies" activeClassName="header__link_active">Фильмы</NavLink>
          <NavLink className="navigation__link" to="/saved-movies" activeClassName="header__link_active">Сохранённые фильмы</NavLink>
          <NavLink className="navigation__link" to="/profile" activeClassName="header__link_active">
            <div className="navigation__profile">
              <p className="navigation__profile__text">Аккаунт</p>
              <div className={`navigation__profile__icon-container${isMainPage ? '-main' : ''}`}>
              <div className="navigation__profile__icon"></div>
              </div>
            </div>
          </NavLink>
        </div>
      ) : (
        <>
          <Link className="header__link" to="/signup">Регистрация</Link>
          <Link to="/signin">
            <button className="header__button">Войти</button>
          </Link>
        </>
      )}
    </>
  );
}

export default Navigation;
