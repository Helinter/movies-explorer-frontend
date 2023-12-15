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
import { useState } from 'react';
import { CurrentUserProvider } from '../../context/CurrentUserContext';


function App() {
  
const [isFinded, setIsFinded] = useState('');
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(false);


  return (
    <CurrentUserProvider>
    <Router>

      <main className="page">

        <Routes>

          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/" element={<Main />}/>
          <Route path="/movies" element={<ProtectedRouteElement element={Movies} 
          isFinded = {isFinded}
          setIsFinded = {setIsFinded}
          movies = {movies}
          setMovies = {setMovies}
          loading = {loading}
          setLoading = {setLoading}
          />}/>
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} 
          isFinded = {isFinded}
          setIsFinded = {setIsFinded}
          movies = {movies}
          setMovies = {setMovies}
          loading = {loading}
          setLoading = {setLoading}
          />}/>
          <Route path="/profile" element={<ProtectedRouteElement element={Profile}/>}/>
          <Route path="*" element={<NotFound />} />

        </Routes>

      </main>

    </Router>
    </CurrentUserProvider>
  );
}

export default App;
