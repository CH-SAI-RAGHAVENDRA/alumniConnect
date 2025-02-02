import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import Navbar from '../others/Navbar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false); // Modal state
  const [role, setRole] = useState(''); // Role state (student or alumni)
  const [googleToken, setGoogleToken] = useState(''); // Store Google token
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      setLoading(false);
      const { token, user } = response.data;
      localStorage.setItem('token', token);

      if (user.type === 'alumni') {
        navigate('/AlumniDashboard');
      } else {
        navigate('/StudentDashboard');
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.response?.data?.message || 'Invalid credentials or server error');
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const googleToken = response.credential;
      const res = await axios.post('http://localhost:5000/auth/googleLogin', {
        token: googleToken,
      });
  
      const { token, user } = res.data;
      localStorage.setItem('token', token);
  
      if (user.type === 'alumni') {
        navigate('/AlumniDashboard');
      } else {
        navigate('/StudentDashboard');
      }
    } catch (err) {
      if (err.response?.status === 404 && err.response?.data?.message === 'User not found') {
        setErrorMessage('User not found. Please register or try again.');
      } else {
        setErrorMessage('Google login failed. Please try again.');
      }
    }
  };
  

  return (
    <div className='h-screen w-full background bg-[url(/images/social-media.png)] bg-no-repeat bg-[16%_70%] bg-[300px_auto]'>
      <div className='flex flex-col md:flex-row justify-around items-start p-5 md:p-10'>
        <div className='flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0 relative top-[75px]'>
          <h1 className='montserrat font-[500] text-3xl md:text-4xl pt-6'>
            Always Be United And <br />
            Build Strong Futures
          </h1>
          <p className='montserrat font-extrabold text-lg md:text-xl pt-4'>
            Be connected with your fellow students and alumni’s
            <br />
            of your college and build strong communities,
            <br />
            share experiences, Be mentors, get Guidance and much
            <br />
            More....
          </p>
        </div>

        <div className='bg-[#2c016d] h-auto w-full md:w-[600px] p-8 rounded-lg'>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
            <h1 className='text-4xl text-[#e4e4e4] font-bold text-center'>Login</h1>

            <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter Email'
              className='bg-[#e4e4e4] font-bold text-black p-4 rounded-lg'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='username'
            />

            <input
              type='password'
              name='password'
              id='password'
              placeholder='Enter password'
              className='bg-[#e4e4e4] font-bold text-black p-4 rounded-lg'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='current-password'
            />

            {errorMessage && (
              <div className='text-red-500 text-sm text-center'>{errorMessage}</div>
            )}

            <button
              className='bg-[#e4e4e4] text-[#2c016d] font-bold p-4 rounded-lg mt-4'
              type='submit'
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className='flex items-center justify-center my-4'>
            <hr className='w-full border-gray-400' />
            <span className='mx-4 text-[#e4e4e4]'>OR</span>
            <hr className='w-full border-gray-400' />
          </div>

          {/* Google login button */}
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log('Google login error')} />

          <div className='text-center mt-4'>
            <p className='text-[#e4e4e4]'>
              Don't have an account?{' '}
              <Link to='./RegisterAlumni' className='text-blue-400 underline'>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Modal for role selection */}
      {showRoleModal && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg w-96'>
            <h2 className='text-2xl font-bold mb-4'>Select Your Role</h2>

            <div className='flex space-x-4'>
              <button
                className='w-full p-4 bg-green-500 text-white rounded-lg'
                onClick={() => setRole('student')}
              >
                Student
              </button>
              <button
                className='w-full p-4 bg-blue-500 text-white rounded-lg'
                onClick={() => setRole('alumni')}
              >
                Alumni
              </button>
            </div>

            <div className='flex justify-center mt-4'>
              <button
                className='w-full p-4 bg-[#2c016d] text-white rounded-lg'
                onClick={handleRoleSelection}
                disabled={!role}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
