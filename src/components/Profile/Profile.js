import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { api } from '../../utils/MainApi';
import { useCurrentUser } from '../../context/CurrentUserContext';

function Profile({ isLogedin, setIsLogedin }) {
  const { currentUser, updateCurrentUser } = useCurrentUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.clear();
    // Добавим обновление isLogedin при выходе
    setIsLogedin(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.updateUserInfo(name, email);
      setIsEditing(false);
      // Обновляем текущего пользователя в контексте
      updateCurrentUser({ ...currentUser, name, email });
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <>
      <Header isLogedin={isLogedin} />
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser?.name || 'Гость'}!</h1>
        <form>
          <div className="profile__input-container">
            <input
              id="profileName"
              className="profile__input"
              minLength="2"
              maxLength="30"
              type="text"
              name="formSignInPassword"
              required
              value={name}
              onChange={handleNameChange}
              readOnly={!isEditing}
            />
            <label className="profile__input-label" htmlFor="profileName">
              Имя
            </label>
          </div>
          <div className="profile__input-container">
            <input
              id="profileEmail"
              className="profile__input"
              minLength="2"
              maxLength="30"
              type="text"
              name="formSignInEmail"
              required
              value={email}
              onChange={handleEmailChange}
              readOnly={!isEditing}
            />
            <label className="profile__input-label" htmlFor="profileEmail">
              E-mail
            </label>
          </div>
          {isEditing && (
            <button type="submit" onClick={handleFormSubmit} className="profile__button" id="SignInSubmit">
              Сохранить
            </button>
          )}
        </form>
        {!isEditing && (
          <a href="#" className="profile__link-q" onClick={handleEditClick}>
            Редактировать
          </a>
        )}
        <Link className="profile__link" onClick={handleLogout} to="/signin">
          Выйти из аккаунта
        </Link>
      </section>
    </>
  );
}

export default Profile;
