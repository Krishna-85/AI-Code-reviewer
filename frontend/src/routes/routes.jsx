import React from 'react'
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import Home from '../Pages/home/Home'
import Project from '../Pages/project/project'
const Approutes = () => {
  return (
     <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/project/:projectId' element={<Project/>}/>
        </Routes>
     </Router>
  )
}

export default Approutes
