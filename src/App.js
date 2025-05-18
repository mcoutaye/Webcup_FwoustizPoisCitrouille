// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import HallOfFame from './HallOfFame';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/halloffame" element={<HallOfFame />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
