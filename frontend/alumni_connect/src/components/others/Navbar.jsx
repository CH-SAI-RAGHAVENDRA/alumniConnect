import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-20 w-full p-14 montserrat flex flex-row background items-center '>
      <img src='/images/sea-logo.png' alt='logo' className='w-[65px] h-[65px]'/>
      <h1 className='text-3xl font-semibold' ><Link to='/' >Alumni Connect</Link></h1>
    </div>
  )
}

export default Navbar
