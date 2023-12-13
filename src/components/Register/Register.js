import React, { useState } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { api } from '../../utils/MainApi'

function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.createUser(name, email, password);
      console.log('Успешная регистрация:', response);
    } catch (error) {
      console.error('Ошибка регистрации:', error);
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
              name="formSignInPassword"
              required
              onChange = {handleNameChange}
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
              onChange = {handleEmailChange}
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
              onChange = {handlePasswordChange}
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
      
      </section >
    </>
  );
}

export default Register;