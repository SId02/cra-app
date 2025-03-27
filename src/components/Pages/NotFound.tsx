import React from "react";
import { NavLink } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <main className="flex flex-col items-center justify-center h-screen px-4 text-center bg-gray-100">
             <p className="text-8xl  font-extrabold text-indigo-600">404</p>
            <h1 className="text-5xl font-bold text-gray-800">Page Not Found</h1>
            <p className="text-2xl mb-4 text-gray-600">The page you're looking for can't be found.</p>
            <p>
                <NavLink to="/"
                    className="inline-block px-6 py-3 text-lg  text-white transition duration-300 rounded-md bg-indigo-600 font-semibold  shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                    Home
                </NavLink>
            </p>
        </main>
    );
};

export default NotFound;
