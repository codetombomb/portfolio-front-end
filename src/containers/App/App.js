import './App.css';
import Portfolio from '../Portfolio/Portfolio';
import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Portfolio />}/>
        </Routes>
    </div>
  );
}

export default App;
