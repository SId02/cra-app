import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
    ];
  
    return (
        <nav className="bg-white border-b border-gray-200 dark:bg-gray-900" aria-label="Main Navigation">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink to="/" className="flex items-center space-x-3">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ReactApp</span>
                </NavLink>
                <button
                    onClick={toggleMobileMenu}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
                    aria-controls="navbar-default"
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle navigation menu"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                <div className={`w-full md:block md:w-auto ${isMobileMenuOpen ? '' : 'hidden'}`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link.path}
                                    className="block py-2 px-3 rounded-md relative text-gray-900 dark:text-white"
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] transition-all duration-300 bg-transparent"></span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
