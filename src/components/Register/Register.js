import Header from '../Header/Header';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <>
      <Header />
      <div className="register">
        <p className="register__title">Добро пожаловать!</p>
        <form >
          <div className="register__input-container">
            <input
              id="registerName"
              className="signup__input"
              minLength="2"
              maxLength="30"
              type="text"
              name="formSignInPassword"
              required
            />
            <label className="register__input-label" for="registerName">Имя</label>
          </div>
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
            Зарегистрироваться
          </button>

        </form >
       
          <p className="signup__link-q">Уже зарегистрированы?
            <Link className="signup__link" to="/signin"> Войти</Link>
          </p>
      
      </div >
    </>
  );
}

export default Register;