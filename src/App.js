import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.scss';

import Header from './Components/Header';
import Main from './Pages/Main';
import Authorization from './Pages/Authorization';
import Me from './Pages/Me';


function App() {
  return (
    <Router>
      <header>
        <Header />
      </header>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route exact path='/authorization' element={<Authorization />} />
        <Route exact path='/me' element={<Me />} />
      </Routes>
    </Router>
  );
}

export default App;
