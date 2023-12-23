import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { api } from '../../utils/MainApi';
import { useFormWithValidation } from '../FormValidator/FormValidator';
import Union from '../../images/Union.svg';
import Unioner from '../../images/Unioner.svg';
import {  useNavigate } from 'react-router-dom';
import { setToken } from '../TokenHelper/TokenHelper';
import { useCurrentUser } from '../../context/CurrentUserContext';

function Register({ setIsRegistered, setImageSrc, setError, setIsLogedin }) {
  const { values, handleChange, isValid, validateEmail, validateName, validatePassword } = useFormWithValidation();
  const { updateCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (isValid) {
      try {
        const response = await api.createUser(values.name, values.email, values.password);
        console.log('Успешная регистрация:', response);
        setIsRegistered(true);
        setImageSrc(Union);
        const res = await api.login(values.email, values.password);
        if (res.token) {
          setToken(res.token);
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
        console.error('Ошибка регистрации:', error);
        setError(error.message || 'Что-то пошло не так! Попробуйте ещё раз.');
        setImageSrc(Unioner);
      }
    }
  };

  return (
    <>
      <Header />
      <section className="register">
        <h1 className="register__title">Добро пожаловать!</h1>
        <form onSubmit={handleRegister}>
          <div className="register__input-container">
            <input
              id="registerName"
              className="signup__input"
              minLength="2"
              maxLength="30"
              type="text"
              name="name"
              required
              onChange={handleChange}
              value={values.name || ''}
            />
            <label className="register__input-label" htmlFor="registerName">
              Имя
            </label>
          </div>
          <span>{validateName(values.name)}</span>

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

          <button type="submit" className="signup__button" id="SignInSubmit" disabled={!isValid}>
            Зарегистрироваться
          </button>
        </form>

        <p className="signup__link-q">
          Уже зарегистрированы?
          <Link className="signup__link" to="/signin">
            Войти
          </Link>
        </p>
      </section>
    </>
  );
}

export default Register;
