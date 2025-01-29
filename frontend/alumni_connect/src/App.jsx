import React from 'react'
import Navbar from './components/others/Navbar'
import LoginPage from './components/pages/LoginPage'
import RegisterAlumni from './components/pages/RegisterAlumni'
import { Route, Routes } from 'react-router-dom'
import RegisterStudent from './components/pages/RegisterStudent'

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/registerAlumni' element={<RegisterAlumni/>}/>
        <Route path='/registerStudent' element={<RegisterStudent/>}/>
      </Routes>
    </>
  )
}

export default App
