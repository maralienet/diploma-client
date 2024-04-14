import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.scss';

import Header from './Components/Header';
import Main from './Pages/Main';
import Authorization from './Pages/Authorization';
import Me from './Pages/Me';
import Help from './Pages/Help';


function App() {

  document.onkeydown = function (e) {
    if (e.keyCode == 112) {
      var a = document.createElement('a');
      a.href = '/help';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return false;
    }
    else {
      console.log(1111)
    }
  }

  return (
    <Router>
      <header>
        <Header />
      </header>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route exact path='/authorization' element={<Authorization />} />
        <Route exact path='/me' element={<Me />} />
        <Route exact path='/help' element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;
