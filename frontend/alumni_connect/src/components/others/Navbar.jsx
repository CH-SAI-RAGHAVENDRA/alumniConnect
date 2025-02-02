import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="h-20 w-full px-6 md:px-14 py-4 flex items-center justify-between background montserrat">
      <div className="flex items-center space-x-3">
        <img src="/images/sea-logo.png" alt="logo" className="w-[50px] h-[50px] md:w-[65px] md:h-[65px]" />
        <h1 className="text-2xl md:text-3xl font-semibold">
          <Link to="/">Alumni Connect</Link>
        </h1>
      </div>
      <div className="hidden md:flex space-x-8 text-lg">
        <Link to="/about" className="hover:text-gray-300">About Us</Link>
        <Link to="/events" className="hover:text-gray-300">Events</Link>
        <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        <Link to="/login" className="hover:text-gray-300">Login</Link>
      </div>
      <button className="md:hidden text-white text-xl">☰</button> {/* For mobile menu icon */}
    </div>
  );
};
export default Navbar;