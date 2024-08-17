import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'; // Ensure axios is imported
import UserContext from '../context/create';
import { GoogleIcon } from './GoogleIcon.jsx';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const navigate = useNavigate();
  const { isLoggedIn, user, setUser, setIsLoggedIn } = useContext(UserContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      toast.error("You should be logged in to access the Dashboard.");
    }
  };

  const handleLogout = async (e) => {
    try {
      await axios.post('http://localhost:8080/logout', {},{ 
        withCredentials: true 
      })
      
      setUser(null);
      setIsLoggedIn(false);
      console.log('User logged out:', user);
      navigate('/'); 
      toast.success("Logged out successfully.");
    }
    catch (err) {
      console.error('Logout error:', err);
      toast.error("Logout failed.");
    }
  };

  return (
    <header className="dark:bg-zinc-800 dark:text-gray-100">
      <div className="container flex justify-between items-center h-16 mx-auto">
        <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
          {/* Add your logo or branding here */}
        </a>
        <button onClick={toggleMenu} className="p-4 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div className="lg:flex hidden">
          <ul className="flex items-center space-x-4">
            <li><a rel="noopener noreferrer" href="/" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Home</a></li>
            <li><button onClick={handleDashboardClick} className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Dashboard</button></li>
            {isLoggedIn && (
              <li className="relative">
                <button onClick={toggleDropdown} className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">
                  <img src={user?.picture} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                  {user?.fullname}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md">
                    <button onClick={handleLogout} className="block px-4 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-600 w-full text-left flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H3m14 4h-4a2 2 0 01-2-2V4a2 2 0 012-2h4a2 2 0 012 2v12a2 2 0 01-2 2z"></path>
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
          {!isLoggedIn &&
            <div className="items-center flex-shrink-0 hidden lg:flex">
              <a href='http://localhost:8080/login' className='inline-block'>
                <button className='flex items-center bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 py-2 px-4 rounded-md'>
                  <GoogleIcon style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} />
                  <span className='text-xs font-medium'>Continue with Google</span>
                </button>
              </a>
            </div>
          }
        </div>
      </div>
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-md`}>
        <ul className="flex flex-col justify-between py-4">
          <li><a rel="noopener noreferrer" href="/Home" className="block px-4 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-600">Home</a></li>
          <li><button onClick={handleDashboardClick} className="block px-4 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-600">Dashboard</button></li>
          {isLoggedIn && (
            <>
              <li>
                <a rel="noopener noreferrer" href="/profile" className=" px-4 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-600 flex items-center">
                  <img src={user?.profileImage} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                  {user?.fullname}
                </a>
              </li>
              <li>
                <button onClick={handleLogout} className='block px-4 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-600 flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H3m14 4h-4a2 2 0 01-2-2V4a2 2 0 012-2h4a2 2 0 012 2v12a2 2 0 01-2 2z"></path>
                  </svg>
                  Logout
                </button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <li>
              <a href='http://localhost:8080/login' className='inline-block'>
                <button className='flex items-center bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 py-2 px-4 rounded-md'>
                  <GoogleIcon style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} />
                  <span className='text-xs font-medium'>Continue with Google</span>
                </button>
              </a>
            </li>
          )}
        </ul>
      </div>
      <ToastContainer position="top-center" />
    </header>
  );
};
