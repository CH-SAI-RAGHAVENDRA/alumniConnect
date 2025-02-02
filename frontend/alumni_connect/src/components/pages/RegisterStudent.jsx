import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import LoginPage from './LoginPage';
import axios from 'axios';
const RegisterStudent = () => {
  const [selectedOption, setSelectedOption] = useState('student');
  const [fullName, setFullName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [domain, setDomain] = useState('');
  const [year, setYear] = useState('');
  const [percentile, setPercentile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === 'student') {
      navigate('/registerStudent');
    } else navigate('/registerAlumni');
  };
  //Save student data to db
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !rollNo || !email || !department || !domain || !year || !percentile || !password) {
      setErrorMessage('All fields are required');
      return;
    }
    console.log( typeof fullName,typeof rollNo,typeof email,typeof department,typeof domain,typeof year,typeof percentile,typeof password);
    setLoading(true); 
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/students/register', {
        fullName,
        rollNo,
        email,
        department,
        domain,
        year,
        percentile,
        password,
      });

      setLoading(false);

      console.log(response.data);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const googleToken = response.credential;
      const res = await axios.post('http://localhost:5000/auth/googleRegister', {
        token: googleToken,
        type: selectedOption
      });
      if(res.data.message === 'User already exists'){
        setErrorMessage('User already exists. Please login');
        return;
      }
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      console.log('Google user logged in:', user);
      navigate('/');
    } catch (err) {
      setErrorMessage('Google login failed');
      console.log('Google login error:', err);
    }
  };

  return (
    <div className="min-h-screen w-full background">
      <main className="flex flex-col md:flex-row justify-around items-center p-5 md:p-10">
        <section className="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0 gap-[100px]">
          <h1 className="main-text montserrat font-[600] text-3xl md:text-4xl pt-6">
            Let's start our journey towards building communities and Strong Futures together
          </h1>
          <div className="font-montserrat font-[400] text-xl md:text-2xl justify-self-center text-white space-y-4">
            <div>
              <input
                type="radio"
                id="option1"
                name="options"
                value="Student"
                checked={selectedOption === 'student'}
                onChange={handleChange}
                className="appearance-none w-4 h-4 border-2 border-gray-400 rounded-full checked:bg-black checked:border-black checked:ring-2 checked:ring-white checked:ring-offset-2 checked:ring-offset-gray-800 mr-2"
              />
              <label htmlFor="option1">Connect as Student</label>
            </div>
            <div>
              <input
                type="radio"
                id="option2"
                name="options"
                value="Alumni"
                checked={selectedOption === 'alumni'}
                onChange={handleChange}
                className="appearance-none w-4 h-4 border-2 border-gray-400 rounded-full checked:bg-black checked:border-black checked:ring-2 checked:ring-white checked:ring-offset-2 checked:ring-offset-gray-800 mr-2"
              />
              <label htmlFor="option2">Connect as Alumni</label>
            </div>
          </div>
        </section>

        <div className="bg-[#2c016d] w-full max-w-[600px] p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <h1 className="text-4xl text-[#e4e4e4] font-bold text-center">Register</h1>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Full Name"
                className="bg-[#e4e4e4] font-bold text-black p-4 rounded-lg w-full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="text"
                name="rollno"
                id="rollno"
                placeholder="Enter Roll Number"
                className="bg-[#e4e4e4] font-bold text-black p-4 rounded-lg w-full"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
            </div>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              className="bg-[#e4e4e4] font-bold text-black p-4 rounded-lg w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="department"
                id="department"
                placeholder="Enter your Department"
                className="bg-[#e4e4e4] font-bold text-black p-4 rounded-lg w-full"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
              <input
                type="number"
                min="2010"
                max="2025"
                name="year"
                id="year"
                placeholder="Enter your batch"
                className="bg-[#e4e4e4] font-bold text-black p-4 rounded-lg w-full"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="interested-domain"
                id="interested-domain"
                placeholder="Interested Domain"
                className="bg-[#e4e4e4] font-bold text-black p-4 rounded-lg w-full"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <input
                type="number"
                min="50"
                max="100"
                name="percentile"
                id="percentile"
                placeholder="Percentile"
                className="bg-[#e4e4e4] font-bold text-black p-4 rounded-lg w-full"
                value={percentile}
                onChange={(e) => setPercentile(e.target.value)}
              />
            </div>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className="bg-[#e4e4e4] font-bold text-black p-4 rounded-lg w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && (
              <div className="text-red-500 text-sm text-center">{errorMessage}</div>
            )}
            <button className="bg-[#e4e4e4] text-[#2c016d] font-bold p-4 rounded-lg w-full flex items-center justify-center" type="submit"  disabled={loading}>
              Register
            </button>

            <div className="flex items-center justify-center my-4">
              <hr className="w-full border-gray-400" />
              <span className="mx-4 text-[#e4e4e4] font-semibold">OR</span>
              <hr className="w-full border-gray-400" />
            </div>

            <div className='w-full h-full'><GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log('Google login error')}  /></div>

            <div className="text-center mt-4">
              <p className="text-[#e4e4e4]">
                Have an account?{' '}
                <Link to="/" className="text-blue-400 underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegisterStudent;