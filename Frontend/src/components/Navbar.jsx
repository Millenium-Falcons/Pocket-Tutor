import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using react-router for navigation

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl mx-4 font-bold text-amber-500">
              Pocket Tutor
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/home" className="font-bold hover:text-amber-500">
              Home
            </Link>
            <Link to="/ai" className="font-bold hover:text-amber-500">
              AI
            </Link>
            <Link to="/profile" className="font-bold hover:text-amber-500">
              Profile
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <div className=" px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/home" className="block px-3 py-2 rounded-md text-base font-medium hover:text-amber-500">
              Home
            </Link>
            <Link to="/ai" className="block px-3 py-2 rounded-md text-base font-medium hover:text-amber-500">
              AI
            </Link>
            <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:text-amber-500">
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
