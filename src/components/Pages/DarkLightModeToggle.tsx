import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const DarkLightModeToggle: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const handleToggle = () => {
        setIsDarkMode(prevMode => !prevMode);
    };
    return (
        <> 
        <section className={`flex items-center justify-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <div className="text-center">
                <p className="text-4xl font-bold mb-4">React JS With Typescript</p>
                <p className="text-xl mb-6">React JS With Typescript</p>
                <button
                    className={`px-4 py-2 rounded transition duration-300 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-400'}`}
                    onClick={handleToggle}
                >
                    {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                </button>
            </div>
        </section>
        <footer className="flex justify-center mt-4">
                <Link to="/" className="text-blue-500 hover:underline">
                    Back to Home
                </Link>
            </footer>
            </>
    );
};
export default DarkLightModeToggle;
