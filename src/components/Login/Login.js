import React from 'react';
import Header from '../Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../utils/MainApi';
import { setToken } from '../TokenHelper/TokenHelper';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useFormWithValidation } from '../FormValidator/FormValidator';

function Login({ setIsLogedin }) {
  const { updateCurrentUser } = useCurrentUser();
  const navigate = useNavigate();
  const { values, handleChange, isValid, validateEmail, validatePassword } = useFormWithValidation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isValid) {
      try {
        const response = await api.login(values.email, values.password);
        if (response.token) {
          setToken(response.token);
          setIsLogedin(true);
          const storedCurrentUser = localStorage.getItem('currentUser');
          const userData = await api.getUserInfo();
          if (userData) {
            updateCurrentUser(userData);

            if (!storedCurrentUser) {
              localStorage.setItem('currentUser', JSON.stringify(userData));
            }
          }
          navigate('/movies');
        }
      } catch (error) {
        console.error('Ошибка авторизации:', error);
      }
    }
  };

  return (
    <>
      <Header />
      <section className="register">
        <h1 className="register__title">Рады видеть!</h1>
        <form onSubmit={handleLogin}>
          <div className="register__input-container">
            <input
              id="registerEmail"
              className="signup__input"
              minLength="2"
              maxLength="30"
              type="text"
              name="email"
              required
              onChange={handleChange}
              value={values.email || ''}
            />
            <label className="register__input-label" htmlFor="registerEmail">
              E-mail
            </label>
          </div>
          <span>{validateEmail(values.email)}</span>

          <div className="register__input-container">
            <input
              id="registerPassword"
              className="signup__input"
              minLength="2"
              maxLength="30"
              type="password"
              name="password"
              required
              onChange={handleChange}
              value={values.password || ''}
            />
            <label className="register__input-label" htmlFor="registerPassword">
              Пароль
            </label>
          </div>
          <span>{validatePassword(values.password)}</span>

          <button type="submit" className="signin__button" id="SignInSubmit" disabled={!isValid}>
            Войти
          </button>
        </form>

        <p className="signup__link-q">
          Ещё не зарегистрированы?
          <Link className="signup__link" to="/signup">
            Регистрация
          </Link>
        </p>
      </section>
    </>
  );
}

export default Login;
