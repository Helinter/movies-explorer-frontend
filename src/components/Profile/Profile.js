import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { api } from '../../utils/MainApi';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useFormWithValidation } from '../FormValidator/FormValidator';

function Profile({ isLogedin, setIsLogedin }) {
  const { currentUser, updateCurrentUser } = useCurrentUser();
  const { values, handleChange, isValid, resetForm, validateEmail, validateName } = useFormWithValidation();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      resetForm({
        name: currentUser.name || '',
        email: currentUser.email || '',
      });
    }
  }, [currentUser, resetForm]);

  useEffect(() => {
    if (!currentUser && !values.name && !values.email) {
      const storedCurrentUser = localStorage.getItem('currentUser');
      if (storedCurrentUser) {
        const parsedUser = JSON.parse(storedCurrentUser);
        updateCurrentUser(parsedUser, () => {});
      }
    }
  }, [currentUser, values.name, values.email, updateCurrentUser]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogedin(false);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (isValid) {
      try {
        const { name, email } = values;
        const updatedUserData = await api.updateUserInfo(name, email);

        if (name !== currentUser.name || email !== currentUser.email) {
          setIsEditing(false);
          await updateCurrentUser({
            ...currentUser,
            name: updatedUserData.name,
            email: updatedUserData.email,
          });
        }
      } catch (error) {
        console.error('Error updating user info:', error);
      }
    }
  };

  return (
    <>
      <Header isLogedin={isLogedin} />
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser?.name || 'Гость'}!</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="profile__input-container">
            <input
              id="profileName"
              className="profile__input"
              minLength="2"
              maxLength="30"
              type="text"
              name="name"
              required
              value={values.name || ''}
              onChange={handleChange}
              readOnly={!isEditing}
            />
            <label className="profile__input-label" htmlFor="profileName">
              Имя
            </label>
            <span className="profile__error">{validateName(values.name)}</span>
          </div>
          <div className="profile__input-container">
            <input
              id="profileEmail"
              className="profile__input"
              minLength="2"
              maxLength="30"
              type="text"
              name="email"
              required
              value={values.email || ''}
              onChange={handleChange}
              readOnly={!isEditing}
            />
            <label className="profile__input-label" htmlFor="profileEmail">
              E-mail
            </label>
            <span className="profile__error">{validateEmail(values.email)}</span>
          </div>
          {isEditing && (
            <button type="submit" className="profile__button" id="SignInSubmit">
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
