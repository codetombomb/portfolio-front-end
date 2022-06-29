import './App.css';
import Portfolio from '../Portfolio/Portfolio';
import WorksContainer from '../WorksContainer/WorksContainer'
import About from '../../components/About/About';
import Contact from '../../components/Contact/Contact';
import projectData from '../../projectData';
import React, {useState} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'

const colors = {
  green: "#D2DF35",
  orange: "#FEA100",
  purple: "#4541FF",
  aqua: "#1CAA9D"
}

const buttons = [
  {type: "Works"},
  {type: "About"},
  {type: "Contact"}
]

function App() {
  const [page, setPage] = useState('/')
  const navigate = useNavigate()

  const getColor = () => {
    if(page === '/') {
      return colors.green
    } else if (page === 'about'){
      return colors.purple
    } else if (page === 'works'){
      return colors.aqua
    } else{
      return colors.orange
    }
  }

  const onHandleClick = (e) => {
    setPage(e.target.textContent.toLowerCase())
    navigate(`/${e.target.textContent.toLowerCase()}`)

  }

  return (
    <div style={{backgroundColor: getColor()}}className="App">
        <Routes>
          <Route path='/' element={<Portfolio buttons={buttons} handleClick={onHandleClick}/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/works' element={<WorksContainer projectData={projectData}/>} />
          <Route path='/contact' element={<Contact/>} />
        </Routes>
    </div>
  );
}

export default App;
