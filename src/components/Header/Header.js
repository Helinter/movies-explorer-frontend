import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({isLogedin}) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';
  const isMainPage = location.pathname === '/';

  return (
    <header className={`header${isAuthPage ? ' header-auth' : ''}${isMainPage ? ' header-main' : ''}`}>
      <Link to="/" className={`header__logo${isAuthPage ? ' header__logo-auth' : ''}`}>
        <img src={logo} alt="Лого" />
      </Link>
      {!isAuthPage && <Navigation isLogedin={isLogedin}/>}
    </header>
  );
}

export default Header;
