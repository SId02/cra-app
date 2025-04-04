import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StopWatch: React.FC = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [laps, setLaps] = useState<string[]>([]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 59) {
                        setMinutes((prevMinutes) => {
                            if (prevMinutes === 59) {
                                setHours((prevHours) => prevHours + 1);
                                return 0;
                            }
                            return prevMinutes + 1;
                        });
                        return 0;
                    }
                    return prevSeconds + 1;
                });
            }, 1000);
        } else {
            if (interval) {
                clearInterval(interval);
            }
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setLaps([]);
    };

    const handleLap = () => {
        if (isRunning) {
            const lapTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            setLaps([...laps, lapTime]);
        }
    };

    const formatTime = (h: number, m: number, s: number): string =>
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                    <h1 className="text-4xl font-bold text-center mb-5">
                        {formatTime(hours, minutes, seconds)}
                    </h1>

                    <div className="flex justify-center space-x-4">
                        <button
                            className={`px-4 py-2 rounded ${isRunning ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
                            onClick={handleStartStop}
                        >
                            {isRunning ? 'Pause' : 'Start'}
                        </button>

                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={handleLap}
                            disabled={!isRunning}
                        >
                            Lap
                        </button>

                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>

                    {laps.length > 0 && (
                        <div className="mt-5">
                            <h3 className="text-xl font-semibold">Laps</h3>
                            <div className="flex flex-col space-y-2 mt-2">
                                {laps.map((lap, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                                        Lap {index + 1}: {lap}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
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

export default StopWatch;
