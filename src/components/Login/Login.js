import Header from '../Header/Header'
import { Link } from 'react-router-dom';

function Login() {
  return (
  <>
    <Header />
      <section className="register">
        <p className="register__title">Рады видеть!</p>
        <form >
          <div className="register__input-container">
            <input
              id="registerEmail"
              className="signup__input"
              minLength="2"
              maxLength="30"
              type="text"
              name="formSignInEmail"
              required
            />
            <label className="register__input-label" for="registerEmail">E-mail</label>
          </div>
          <div className="register__input-container">
            <input
              id="registerPassword"
              className="signup__input"
              minLength="2"
              maxLength="30"
              type="password"
              name="formSignInPassword"
              required
            />
            <label className="register__input-label" for="registerPassword">Пароль</label>
          </div>
          <button type="submit" className="signup__button" id="SignInSubmit">
            Войти
          </button>

        </form >
       
          <p className="signup__link-q">Ещё не зарегистрированы?
            <Link className="signup__link" to="/signup"> Регистрация</Link>
          </p>
      
      </section >
  </>
  );
}

export default Login;