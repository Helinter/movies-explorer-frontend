import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <header className={`header${isAuthPage ? ' header-auth' : ''}`}>
      <img className={`header__logo${isAuthPage ? ' header__logo-auth' : ''}`} src={logo} alt="Лого"/>
      {!isAuthPage && (
        <>
          <Link className="header__link" to="/signup">Регистрация</Link>
          <Link to="/signin">
            <button className="header__button">Войти</button>
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
