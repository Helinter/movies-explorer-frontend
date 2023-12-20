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


function App() {
  
  const [isLogedin, setIsLogedin] = useState(() => {
    // Пытаемся получить значение из localStorage
    const storedIsLogedin = localStorage.getItem('isLogedin');
    // Преобразуем значение в булев тип и возвращаем
    return storedIsLogedin ? JSON.parse(storedIsLogedin) : false;
  });

  useEffect(() => {
    // При изменении значения сохраняем его в localStorage
    localStorage.setItem('isLogedin', JSON.stringify(isLogedin));
  }, [isLogedin]);

  return (
    <CurrentUserProvider>
    <Router>

      <main className="page">

        <Routes>

          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login setIsLogedin={setIsLogedin }/>} />
          <Route path="/" element={<Main isLogedin={isLogedin}/>}/>
          <Route path="/movies" element={<ProtectedRouteElement element={Movies} isLogedin={isLogedin}/>}/>
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} isLogedin={isLogedin}/>}/>
          <Route path="/profile" element={<ProtectedRouteElement element={Profile} isLogedin={isLogedin} setIsLogedin={setIsLogedin}/>}/>
          <Route path="*" element={<NotFound />} />

        </Routes>

      </main>

    </Router>
    </CurrentUserProvider>
  );
}

export default App;
