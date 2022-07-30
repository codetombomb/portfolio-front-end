import './App.css';
import Portfolio from '../Portfolio/Portfolio';
import WorksContainer from '../WorksContainer/WorksContainer'
import About from '../../components/About/About';
import Contact from '../../components/Contact/Contact';
import projectData from '../../projectData';
import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Footer from "../Footer/Footer"

const buttons = [
  { type: "Works" },
  { type: "Contact" }
]

function App() {
  const [page, setPage] = useState('/')
  const navigate = useNavigate()

  const onHandleClick = (e) => {
    setPage(e.target.textContent.toLowerCase())
    navigate(`/${e.target.textContent.toLowerCase()}`)

  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Portfolio buttons={buttons} handleClick={onHandleClick} />} />
        <Route path='/about' element={<About />} />
        <Route path='/works' element={<WorksContainer projectData={projectData} />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
