import { useLocation } from 'react-router-dom';
import logo from '../../images/logo.png';
import Navigation from '../Navigation/Navigation';

function Header() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';
  const isMainPage = location.pathname === '/';

  return (
    <header className={`header${isAuthPage ? ' header-auth' : ''}${isMainPage ? ' header-main' : ''}`}>
      <img className={`header__logo${isAuthPage ? ' header__logo-auth' : ''}`} src={logo} alt="Лого" />
      {!isAuthPage && <Navigation />}
    </header>
  );
}

export default Header;
