import React, { useState } from 'react';

import { Link } from 'react-router-dom';
const LeapYearChecker: React.FC = () => {
    const [year, setYear] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const checkLeapYear = () => {
        const isLeapYear = new Date(Number(year), 1, 29).getMonth() === 1;
        const messageText = isLeapYear
            ? `The year ${year} is a leap year.`
            : `The year ${year} is not a leap year.`;
        setMessage(messageText);
    };

    return (
        <>
            <section className="flex flex-col items-center p-5">
                <h1 className="text-3xl font-bold mb-4">Leap Year Checker</h1>
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <div className="mb-4">
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter a year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </div>
                    <p className="text-center p-3 text-lg">{message}</p>
                    <button
                        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        type="button"
                        onClick={checkLeapYear}
                    >
                        Submit
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

export default LeapYearChecker;

