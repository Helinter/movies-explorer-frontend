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


function App() {
  return (
    <Router>

      <main className="page">

        <Routes>

          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/" element={<Main />}/>
          <Route path="/movies" element={<ProtectedRouteElement element={Movies}/>}/>
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies}/>}/>
          <Route path="/profile" element={<ProtectedRouteElement element={Profile}/>}/>
          <Route path="*" element={<NotFound />} />

        </Routes>

      </main>

    </Router>
  );
}

export default App;
