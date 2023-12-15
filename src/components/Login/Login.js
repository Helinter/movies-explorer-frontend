import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header'
import { Link } from 'react-router-dom';
import { api } from '../../utils/MainApi'
import { setToken } from '../TokenHelper/TokenHelper';
import { useCurrentUser } from '../../context/CurrentUserContext';

function Login() {
  const { currentUser, updateCurrentUser } = useCurrentUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      console.error('Email и пароль обязательны');
      return;
    }
  
    try {
      const response = await api.login(email, password);
      if (response.token) {
      setToken(response.token); 

      const userData = await api.getUserInfo();
      if (userData){
      updateCurrentUser(userData);
      }
      navigate('/movies');
      }
    }
     catch (error) {
      console.error('Ошибка авторизации:', error);
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
              name="formSignInEmail"
              required
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
            />
            <label className="register__input-label" for="registerPassword">Пароль</label>
          </div>
          <button type="submit" className="signin__button" id="SignInSubmit">
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