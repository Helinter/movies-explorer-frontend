import Header from '../Header/Header';
import { Link } from 'react-router-dom';

function Profile() {
  return (
  <>
    <Header />
      <div className="profile">
        <p className="profile__title">Привет, Виталий!</p>
        <form >
        <div className="profile__input-container">
            <input
              id="profileName"
              className="profile__input"
              minLength="2"
              maxLength="30"
              type="text"
              name="formSignInPassword"
              required
              value="Виталий"
            />
            <label className="profile__input-label" for="profileName">Имя</label>
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
              value="pochta@ya.ru"
            />
            <label className="profile__input-label" for="profileEmail">E-mail</label>
          </div>
          <button type="submit" className="profile__button" id="SignInSubmit">
            Сохранить
          </button>

        </form >
       
          <p className="profile__link-q">Редактировать</p>
            <Link className="profile__link" to="/signin">Выйти из аккаунта</Link>
          
      
      </div >
  </>
  );
}

export default Profile;