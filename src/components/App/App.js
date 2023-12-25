import React from 'react';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { useState, useEffect } from 'react';
import { useCurrentUser } from '../../context/CurrentUserContext';
import Modal from '../Modal/Modal';
import { api } from '../../utils/MainApi';


function App() {
  const navigate = useNavigate();
  const [isLogedin, setIsLogedin] = useState(() => {
    // Пытаемся получить значение из localStorage
    const storedIsLogedin = localStorage.getItem('isLogedin');
    // Преобразуем значение в булев тип и возвращаем
    return storedIsLogedin ? JSON.parse(storedIsLogedin) : false;
  });

  const [hasSearchedOnce, setHasSearchedOnce] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState(null);
  const [isProfileEdited, setIsProfileEdited] = useState(false);
  const { updateCurrentUser } = useCurrentUser();

  useEffect(() => {
    // Вызвать метод checkToken при загрузке приложения
    api.checkToken()
      .then(userData => {
        updateCurrentUser(userData);
        setIsLogedin(true);
      })
      .catch(error => {
        console.error('Ошибка проверки токена:', error);
        // Выполнить логаут в случае ошибки или невалидного токена
        handleLogout();
      });
  }, []);

  useEffect(() => {
    // При изменении значения сохраняем его в localStorage
    localStorage.setItem('isLogedin', JSON.stringify(isLogedin));
  }, [isLogedin]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogedin(false);
    navigate('/');
  };

  return (
  
        <main className="page">

          <Routes>

          <Route
              path="/signup"
              element={isLogedin ? <Navigate to="/" /> : <Register setIsLogedin={setIsLogedin} setIsRegistered={setIsRegistered} setImageSrc={setImageSrc} setError={setError} />}
            />
            <Route
              path="/signin"
              element={isLogedin ? <Navigate to="/" /> : <Login setIsLogedin={setIsLogedin} />}
            />
            <Route path="/" element={<Main isLogedin={isLogedin} />} />
            <Route path="/movies" element={<ProtectedRouteElement element={Movies} hasSearchedOnce={hasSearchedOnce} setHasSearchedOnce={setHasSearchedOnce} isLogedin={isLogedin} />} />
            <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} hasSearchedOnce={hasSearchedOnce} setHasSearchedOnce={setHasSearchedOnce} isLogedin={isLogedin} />} />
            <Route path="/profile" element={<ProtectedRouteElement element={Profile} handleLogout={handleLogout} setImageSrc={setImageSrc}
              setError={setError} setIsProfileEdited={setIsProfileEdited} isLogedin={isLogedin} setIsLogedin={setIsLogedin} />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
          {isRegistered && (
            <Modal
              message="Вы успешно зарегистрировались!"
              onClose={() => setIsRegistered(false)}
              imageSrc={imageSrc}
            />
          )}

          {isProfileEdited && (
            <Modal
              message="Данные успешно изменены!"
              onClose={() => setIsProfileEdited(false)}
              imageSrc={imageSrc}
            />
          )}

          {error && (
            <Modal
              message="Что-то пошло не так! Попробуйте ещё раз."
              onClose={() => setError(null)}
              imageSrc={imageSrc}
            />
          )}
        </main>

  );
}

export default App;
