import React from 'react'
import LoginPage from './components/pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterAlumni from './components/pages/RegisterAlumni';
import RegisterStudent from './components/pages/RegisterStudent';
import AlumniDashboard from './components/dashboards/AlumniDashboard';
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/registerAlumni' element={<RegisterAlumni/>}/>
          <Route path='/registerStudent' element={<RegisterStudent/>}/>
          <Route path='/AlumniDashboard' element={<AlumniDashboard/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
