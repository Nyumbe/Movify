import React from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import Trending from './pages/trending';
import TopRated from './pages/toprated';
import Movies from './pages/movies';
import TV from './pages/TV';
import { AuthProvider } from './contextAuth';
import Detail from './components/Detail';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/moviedetail/:id" element={<Detail />} />
          <Route path="/tvdetail/:id" element={<Detail />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TV />} />
          <Route path="/toprated" element={<TopRated />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
