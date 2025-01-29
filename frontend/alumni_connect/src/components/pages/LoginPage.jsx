import React, { useState } from 'react';
import google from '../assets/google.svg'
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
    } else {
      setError('');
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };

  return (
    <div className='h-screen w-full background bg-[url(/images/social-media.png)] bg-no-repeat bg-[16%_70%] bg-[300px_auto] '>
      <div className='flex flex-col md:flex-row justify-around items-start p-5 md:p-10 '>
        <div className='flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0 relative top-[75px]'>
          <h1 className='montserrat font-[500] text-3xl md:text-4xl pt-6'>
            Always Be United And <br/>
            Build Strong Futures
          </h1>
          <p className='montserrat font-extrabold text-lg md:text-xl pt-4'>
            Be connected with your fellow students and alumni’s<br/>
            of your college and build strong communities,<br/>
            share experiences, Be mentors, get Guidance and much<br/>
            More....
          </p>
        </div>

        <div className='bg-[#2c016d] h-auto w-full md:w-[600px] p-8 rounded-lg'>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
            <h1 className='text-4xl text-[#e4e4e4] font-bold text-center'>Login</h1>

            <input 
              type="email" 
              name="email" 
              id="email"  
              placeholder='Enter Email' 
              className='bg-[#e4e4e4] font-bold text-black p-4 rounded-lg'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder='Enter password'
              className='bg-[#e4e4e4] font-bold text-black p-4 rounded-lg'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500'>{error}</p>}

            <button className='bg-[#e4e4e4] text-[#2c016d] font-bold p-4 rounded-lg mt-4' type='submit'>
              Login
            </button>
          </form>

          <div className='flex items-center justify-center my-4'>
            <hr className='w-full border-gray-400'/>
            <span className='mx-4 text-[#e4e4e4]'>OR</span>
            <hr className='w-full border-gray-400'/>
          </div>

          <button className='bg-[#e4e4e4] text-[#2c016d] font-bold p-4 rounded-lg w-full flex items-center justify-center'>
            Login with
            <img src={google} alt="Google logo" className='h-6 w-6 mr-2 ml-2'/>
          </button>
          <div className='text-center mt-4'>
            <p className='text-[#e4e4e4]'>
              Don't have an account?{' '}
              <Link to='./registerAlumni' className='text-blue-400 underline'>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
