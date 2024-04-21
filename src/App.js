import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.scss';

import Header from './Components/Header';
import Main from './Pages/Main';
import Authorization from './Pages/Authorization';
import Me from './Pages/Me';
import Help from './Pages/Help';


function App() {

  function openHelp(e) {
    if (e.keyCode == 112) {
      var a = document.createElement('a');
      a.href = '/help';
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return false;
    }
  }

  document.onkeydown = (e) => openHelp(e);


  return (
    <Router>
      <header>
        <Header />
      </header>
      <Routes>
        <Route exact path='/' element={<Authorization />} />
        <Route exact path='/me' element={<Me />} />
        <Route exact path='/main' element={<Main />} />
        <Route exact path='/help' element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;
