import React from 'react'
import Navbar from '../others/Navbar'
import { useState } from 'react';
import google from '../assets/google.svg';
import { Link,useNavigate } from 'react-router-dom';


const RegisterAlumni = () => {
    const [selectedOption, setSelectedOption] = useState('Alumni');
    const [fullName, setFullName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('');
    const [percentile, setPercentile] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        if(event.target.value==='Student')
        {
            navigate('/registerStudent');
        }
        else
            navigate('/registerAlumni');
    };

    const handleSubmit=()=>{
        console.log('Hello');
    }





  return (
    <div className='min-h-screen w-full background'>
        <main className='flex flex-col md:flex-row justify-around items-center p-5 md:p-10'>
            <section className='flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0 gap-[100px]'>
                <h1 className='main-text montserrat font-[600] text-3xl md:text-4xl pt-6'>
                    Lets start our journey towards 
                    building communities and 
                    Strong Futures together
                </h1>
                <div className='font-montserrat font-[400] text-2xl justify-self-center text-white '>
                    <div>
                        <input
                        type="radio"
                        id="option1"
                        name="options"
                        value="Student"
                        checked={selectedOption === "Student"}
                        onChange={handleChange}
                        className='font-montserrat text-5xl font-semibold leading-[43.88px]  mr-[20px]'
                        />
                        <label htmlFor="option1">Connect as Student</label>
                    </div>
                    <div>
                        <input
                        type="radio"
                        id="option2"
                        name="options"
                        value="Alumni"
                        checked={selectedOption === "Alumni"}
                        onChange={handleChange}
                        className='font-montserrat text-5xl font-semibold leading-[43.88px]  mr-[20px] '
                        />
                        <label htmlFor="option2">Connect as Alumni</label>
                    </div>
                </div>
            </section>
            <div className='bg-[#2c016d] h-auto w-full md:w-[600px] p-8 rounded-lg'>
                      <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
                        <h1 className='text-4xl text-[#e4e4e4] font-bold text-center'>Login</h1>
                        <div className='name-det flex flex-row gap-2'>
                            <input 
                                type='text' 
                                name="name" 
                                id="name"  
                                placeholder='Enter Full Name' 
                                className='bg-[#e4e4e4] font-bold text-black p-4 rounded-lg'
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <input 
                                type='text' 
                                name="rollno" 
                                id="rollno" 
                                placeholder='Enter Roll Number'
                                className='bg-[#e4e4e4] font-bold text-black p-4 rounded-lg'
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                            />
                        </div>
                        <input 
                                type='email' 
                                name="email" 
                                id="email" 
                                placeholder='Enter Email'
                                className='bg-[#e4e4e4] font-bold text-black p-4 rounded-lg'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="dep-details flex flex-row gap-2">
                            <input 
                                type='text' 
                                name="department" 
                                id="department" 
                                placeholder='Enter your Department'
                                className='bg-[#e4e4e4] font-bold text-black p-4 rounded-lg'
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                            <input 
                                type='number' 
                                min='2010'
                                max='2025'
                                name="year" 
                                id="year" 
                                placeholder='Passed Out Year'
                                className='bg-[#e4e4e4] font-bold text-black p-4 rounded-lg w-full'
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </div>
                        <div className="company-details flex flex-row gap-2">
                            <input 
                                type='text' 
                                name="company-details" 
                                id="company-details" 
                                placeholder='Current Position, Company Name'
                                className='bg-[#e4e4e4] font-bold text-black p-4 rounded-lg'
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                            <input 
                                type='number' 
                                min='50'
                                max='100'
                                name="percentile" 
                                id="percentile" 
                                placeholder='Percentile'
                                className='bg-[#e4e4e4] font-bold text-black p-4 rounded-lg w-full'
                                value={percentile}
                                onChange={(e) => setPercentile(e.target.value)}
                            />
                        </div>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder='Enter password'
                            className='bg-[#e4e4e4] font-bold text-black p-4 rounded-lg'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='flex items-center justify-center my-4'>
                            <hr className='w-full border-gray-400'/>
                            <span className='mx-4 text-[#e4e4e4]  font-semibold'>OR</span>
                            <hr className='w-full border-gray-400'/>
                        </div>
                        <button className='bg-[#e4e4e4] text-[#2c016d] font-bold p-4 rounded-lg w-full flex items-center justify-center'>
                            Login with
                            <img src={google} alt="Google logo" className='h-6 w-6 mr-2 ml-2'/>
                        </button>
                        <div className='text-center mt-4'>
                            <p className='text-[#e4e4e4]'>
                            Have an account?{' '}
                            <Link to='/' className='text-blue-400 underline'>
                                Login
                            </Link>
                            </p>
                        </div>
                        </form>
                    </div>
        </main>
    </div>
    
  )
}

export default RegisterAlumni