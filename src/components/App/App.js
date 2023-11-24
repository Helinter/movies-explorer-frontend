import React from 'react';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>

      <div className="page">

        <Routes>

          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/" element={<Main />}/>
          <Route path="/movies" element={<Movies />}/>
          <Route path="/saved-movies" element={<SavedMovies />}/>
          <Route path="/profile" element={<Profile />}/>

        </Routes>

      </div>

    </Router>
  );
}

export default App;
