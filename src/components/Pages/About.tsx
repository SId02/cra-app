
import React from "react";
import { Link } from 'react-router-dom';
const About: React.FC = () => {
    
    return (
        <>
            <section className="p-5">
                <div className="container p-5 text-center">
                    <h1 className="text-3xl font-bold">About</h1>
                </div>
                <div className="container p-6 mx-auto">
                    <div className="flex justify-center">
                        <div className="w-full max-w-md box p-5">
                    React JS with Typescript 
                    Axios for API
                    React Router Dom version 6 for routing
                    tailwind css version 4 for style
                        </div>
                    </div>
                </div>
                <footer className="flex justify-center mt-4">
                <Link to="/" className="text-blue-500 hover:underline">
                    Back to Home
                </Link>
            </footer>
            </section>
        </>
    );
};
export default About;