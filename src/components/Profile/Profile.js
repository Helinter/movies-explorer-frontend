import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { removeToken } from '../TokenHelper/TokenHelper'; 

function Profile() {

  const handleLogout = () => {
    // При клике на ссылку, удаляем токен из sessionStorage
    removeToken();
  };

  return (
  <>
    <Header />
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
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
              value="pochta@yandex.ru"
            />
            <label className="profile__input-label" for="profileEmail">E-mail</label>
          </div>
          <button type="submit" className="profile__button" id="SignInSubmit">
            Сохранить
          </button>

        </form >
       
          <a href="#" className="profile__link-q">Редактировать</a>
            <Link className="profile__link" onClick={handleLogout} to="/signin">Выйти из аккаунта</Link>
          
      
      </section >
  </>
  );
}

export default Profile;