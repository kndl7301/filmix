import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Movies from './components/Movies';
import Series from './components/Series';
import Popular from './components/Popular';
import Signup from './components/Signup'
import SeriesDetail from './components/SeriesDetail';
import AdminPage from './components/AdminPage';
import AddMovies from './components/AddMovies';
import AddSeries from './components/AddSeries';
import AddPopular from './components/AddPopular';
import UsersInfo from './components/UsersInfo';
import AddSeriesEpisode from './components/AddSeriesEpisode';
import Messages from './components/Messages';

const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Check if token exists
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={isAuthenticated() ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={isAuthenticated() ? <Signup /> : <Navigate to="/" />} />
        <Route path="/home" element={isAuthenticated() ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/movies" element={isAuthenticated() ? <Movies /> : <Navigate to="/" />} />
        <Route path="/series" element={isAuthenticated() ? <Series /> : <Navigate to="/" />} />
        <Route path="/series/:id" element={isAuthenticated() ? <SeriesDetail /> : <Navigate to="/" />} />
        <Route path="/popular" element={isAuthenticated() ? <Popular /> : <Navigate to="/" />} />
        <Route path="/adminpage" element={isAuthenticated() ? <AdminPage /> : <Navigate to="/" />} />
        <Route path="/addmovie" element={isAuthenticated() ? <AddMovies /> : <Navigate to="/" />} />
        <Route path="/addserie" element={isAuthenticated() ? <AddSeries /> : <Navigate to="/" />} />
        <Route path="/addpopular" element={isAuthenticated() ? <AddPopular /> : <Navigate to="/" />} />
        <Route path="/userinfo" element={isAuthenticated() ? <UsersInfo /> : <Navigate to="/" />} />
        <Route path="/addseriesepisode" element={isAuthenticated() ? <AddSeriesEpisode /> : <Navigate to="/" />} />
        <Route path="/messages" element={isAuthenticated() ? <Messages /> : <Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
