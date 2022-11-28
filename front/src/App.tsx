
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import User from './pages/User';

function App() {
  return (
    
    <Routes>
      <Route path="/register" element={ <Register /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/" element={ <User /> } />
    </Routes>

  );
}

export default App;
