import React from 'react'
import LoginPage from './components/pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterAlumni from './components/pages/RegisterAlumni';
import RegisterStudent from './components/pages/RegisterStudent';
import AlumniDashboard from './components/dashboards/AlumniDashboard';
import StudentDashboard from './components/dashboards/StudentDashboard';
import Navbar from './components/others/Navbar';
const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/registerAlumni' element={<RegisterAlumni/>}/>
          <Route path='/registerStudent' element={<RegisterStudent/>}/>
          <Route path='/AlumniDashboard' element={<AlumniDashboard/>}/>
          <Route path='/StudentDashboard' element={<StudentDashboard/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
