import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
interface DateTime {
  time: string;
  date: string;
  day: string;
}const DigitalClock: React.FC = () => {
  const [dateTime, setDateTime] = useState<DateTime>({
    time: '',
    date: '',
    day: ''
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };

      setDateTime({
        time: now.toLocaleTimeString(),
        date: now.toLocaleDateString(undefined, options),
        day: now.toLocaleDateString(undefined, { weekday: 'long' })
      });
    };
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-4xl font-bold">{dateTime.time}</h1>
        <h2 className="text-2xl text-gray-700">{dateTime.day}</h2>
        <h3 className="text-xl text-gray-500">{dateTime.date}</h3>
      </div>
    </div>
     <footer className="flex justify-center mt-4">
     <Link to="/" className="text-blue-500 hover:underline">
         Back to Home
     </Link>
 </footer>
    </>
  );
};

export default DigitalClock;
