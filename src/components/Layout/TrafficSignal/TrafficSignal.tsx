
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
const TrafficSignal: React.FC = () => {
  const [color, setColor] = useState<'red' | 'yellow' | 'green'>('red');
  const [time, setTime] = useState<number>(10);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const timings = {
    red: 40,
    green: 15,
    yellow: 5,
  };

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (time > 0) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      timerRef.current = null;

      if (color === 'red') {
        setColor('green');
        setTime(timings.green);
      } else if (color === 'green') {
        setColor('yellow');
        setTime(timings.yellow);
      } else {
        setColor('red');
        setTime(timings.red);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [color, time]);

  return (
    <>
  
    <div className="flex flex-col items-center mt-6">
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <h1 className="text-2xl text-white text-center">Traffic Signal</h1>
        <div className="flex flex-col items-center justify-around h-64 w-32 border-2 border-gray-900 rounded-lg bg-gray-900 p-4 mt-4">
          <div className={`w-16 h-16 rounded-full transition-opacity duration-300 ${color === 'red' ? 'opacity-100 bg-red-600 shadow-lg' : 'opacity-30 bg-red-600'}`}></div>
          <div className={`w-16 h-16 rounded-full transition-opacity duration-300 ${color === 'yellow' ? 'opacity-100 bg-yellow-400 shadow-lg' : 'opacity-30 bg-yellow-400'}`}></div>
          <div className={`w-16 h-16 rounded-full transition-opacity duration-300 ${color === 'green' ? 'opacity-100 bg-green-600 shadow-lg' : 'opacity-30 bg-green-600'}`}></div>
        </div>
        <p className="text-xl text-white mt-4">Time remaining: {time} seconds</p>
      </div>
      </div>
      <footer className="flex justify-center mt-4">
                <Link to="/" className="text-blue-500 hover:underline">
                    Back to Home
                </Link>
            </footer>
    </>
  );
}

export default TrafficSignal;
