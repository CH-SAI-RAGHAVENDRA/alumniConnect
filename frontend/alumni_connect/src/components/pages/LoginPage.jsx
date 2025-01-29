import React, { useState } from 'react';
import Navbar from '../others/Navbar';
import google from '../assets/google.svg'; // Google image for button
import { GoogleLogin } from '@react-oauth/google'; // Import the GoogleLogin component
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // On success, store the token in localStorage or state
      const { token, user} = response.data;
      localStorage.setItem('token', token);
      console.log(response.data.user.type);
      if(response.data.user.type === "alumni"){
        navigate('/AlumniDashboard');
      }
      else{
        navigate('/StudentDashboard');
      }
      // Redirect to dashboard or other pages
    } catch (err) {
      console.log(err);
      setErrorMessage('Invalid credentials or server error');
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const googleToken = response.credential;
      const res = await axios.post('http://localhost:5000/api/auth/google-login', {
        token: googleToken,
      });

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      console.log('Google user logged in:', user);
      // Redirect to dashboard or another page
    } catch (err) {
      console.log('Google login error:', err);
      setErrorMessage('Google login failed');
    }
  };

  return (
    <div className="h-screen w-screen background">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-around items-center p-5 md:p-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
          <h1 className="montserrat font-[500] text-3xl md:text-4xl pt-6">
            Always Be United And <br />
            Build Strong Futures
          </h1>
          <p className="montserrat font-extrabold text-lg md:text-xl pt-4">
            Be connected with your fellow students and alumni’s<br />
            of your college and build strong communities,<br />
            share experiences, Be mentors, get Guidance and much<br />
            More....
          </p>
        </div>

        <div className="bg-[#2c016d] h-auto w-full md:w-[600px] p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <h1 className="text-4xl text-[#e4e4e4] font-bold text-center">Login</h1>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              className="bg-[#e4e4e4] font-bold text-black p-4 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className="bg-[#e4e4e4] font-bold text-black p-4 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            {errorMessage && (
              <div className="text-red-500 text-sm text-center">{errorMessage}</div>
            )}

            <button
              className="bg-[#e4e4e4] text-[#2c016d] font-bold p-4 rounded-lg mt-4"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="flex items-center justify-center my-4">
            <hr className="w-full border-gray-400" />
            <span className="mx-4 text-[#e4e4e4]">OR</span>
            <hr className="w-full border-gray-400" />
          </div>

          {/* Google login button */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log('Google login error')}
          />
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
    </div>
  );
};

export default LoginPage;
