import React from 'react';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { useState, useEffect } from 'react';
import { CurrentUserProvider } from '../../context/CurrentUserContext';
import Modal from '../Modal/Modal';


function App() {

  const [isLogedin, setIsLogedin] = useState(() => {
    // Пытаемся получить значение из localStorage
    const storedIsLogedin = localStorage.getItem('isLogedin');
    // Преобразуем значение в булев тип и возвращаем
    return storedIsLogedin ? JSON.parse(storedIsLogedin) : false;
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState(null);
  const [isProfileEdited, setIsProfileEdited] = useState(false);

  useEffect(() => {
    // При изменении значения сохраняем его в localStorage
    localStorage.setItem('isLogedin', JSON.stringify(isLogedin));
  }, [isLogedin]);

  return (
    <CurrentUserProvider>
      <Router>

        <main className="page">

          <Routes>

            <Route path="/signup" element={<Register
              setIsLogedin={setIsLogedin}
              setIsRegistered={setIsRegistered}
              setImageSrc={setImageSrc}
              setError={setError} />} />
            <Route path="/signin" element={<Login setIsLogedin={setIsLogedin} />} />
            <Route path="/" element={<Main isLogedin={isLogedin} />} />
            <Route path="/movies" element={<ProtectedRouteElement element={Movies} isLogedin={isLogedin} />} />
            <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} isLogedin={isLogedin} />} />
            <Route path="/profile" element={<ProtectedRouteElement element={Profile} setImageSrc={setImageSrc}
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

      </Router>
    </CurrentUserProvider>
  );
}

export default App;
