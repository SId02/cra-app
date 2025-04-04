import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const allProjects = [
        { label: "Age Validation", path: "/AgeValidation" },
        { label: "BMI Calculator", path: "/BmiCalculator" },
        { label: "Counter", path: "/counter" },
        { label: "Country Details", path: "/countrydetails" },
        { label: "Digital Clock", path: "/digitalclock" },
        { label: "DataInTable", path: "/DataInTable" },
        { label: "Dark Light Mode Toggle", path: "/DarkLightModeToggle" },
        { label: "Date Picker", path: "/DatePicker" },
        { label: "Data Fetch Using UseReducer", path: "/DataFetchUsingUseReducer" },
        { label: "Form Validation", path: "/formvalidation" },
        { label: "GitHub User Profile Finder", path: "/GithubUserProfileFinder" },
        { label: "Leap Year Checker", path: "/LeapYearChecker" },
        { label: "Login Page With Default Value", path: "/LoginPageWithDefaultValue" },
        { label: "Login Page With API", path: "/LoginPageWithAPI" },
        { label: "Password Generator", path: "/passwordgenerator" },
        { label: "PasswordStrengthChecker", path: "/passwordstrengthchecker" },
        { label: "Product List Pagination", path: "/ProductListPaginations" },
        { label: "ProductListSearchSortFilter", path: "/ProductListSearchSortFilter" },
        { label: "Random Color Generator", path: "/randomcolorgenerator" },
        { label: "RandomJokes", path: "/RandomJokes" }, 
        { label: "RandomUser", path: "/RandomUser" }, 
        { label: "Stop Watch", path: "/stopwatch" },
        { label: "Typeahead", path: "/Typeahead" },
        { label: "Toggle Password Visibility", path: "/togglepasswordvisibility" },
        { label: "Tip Calculator", path: "/TipCalculator" },
        { label: "Traffic Signal", path: "/TrafficSignal" },
        {label:"TestimonialSlider",path:"/TestimonialSlider"},
        { label: "Word Counter", path: "/WordCounter" },
        { label: "Year Calculator", path: "/YearCalculator" }
    ];

    const [visibleProjects, setVisibleProjects] = useState(8);
    const projectsToAdd = 4;
    const [showGoTop, setShowGoTop] = useState(false);

    const handleShowMore = () => {
        setVisibleProjects((prevVisible) => Math.min(prevVisible + projectsToAdd, allProjects.length));
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > document.documentElement.scrollHeight - window.innerHeight - 200) {
                setShowGoTop(true);
            } else {
                setShowGoTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-16 transition-opacity duration-500 ease-in-out">
                <div className="container text-center px-4">
                    <h1 className="text-white text-4xl sm:text-5xl font-bold mb-5 pb-5">React App</h1>
                    <p className="text-black text-lg pt-5 mt-5">
                        It's a Web App using React JS 19, React Router Version 6.30.0, Axios, and Tailwind CSS 4.
                    </p>
                </div>
            </section>

            <section className="py-10 bg-zinc-300 transition-opacity duration-500 ease-in-out">
                <div className="container mx-auto px-4">
                    <h2 className="text-black text-3xl font-bold text-center mb-8">Projects</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                        {allProjects.slice(0, visibleProjects).map(({ path, label }) => (
                            <Link
                                key={path}
                                to={path}
                                className="bg-white rounded-md shadow-md text-blue-600 hover:text-blue-800 font-medium py-3 px-4 flex items-center justify-center transition-colors duration-300"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                    {visibleProjects < allProjects.length && (
                        <div className="text-center mt-6">
                            <button
                                onClick={handleShowMore}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </section>
            {showGoTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-opacity duration-300"
                >
                  ^
                </button>
            )}
        </>
    );
};

export default Home;