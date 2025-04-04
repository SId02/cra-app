
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  const incrementCount2 = () => {
    setCount2(count2 + 1);
  };

  const decrementCount2 = () => {
    setCount2(Math.max(0, count2 - 1));
  };

  const resetCount2 = () => {
    setCount2(0);
  };

  const getCountColor = (value: number) => {
    if (value > 0) return "text-green-500";
    if (value < 0) return "text-red-500";
    return "text-gray-500";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold dark:text-white">
            Counters
          </h3>
        </div>
      </header>
      <main className="flex-grow p-4 sm:p-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* First Counter */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="p-4 sm:p-8">
                <div
                  className={`text-4xl sm:text-6xl font-extrabold text-center mb-4 sm:mb-8 ${getCountColor(
                    count
                  )} dark:text-white`}
                >
                  {count}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-around p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors mb-2 sm:mb-0"
                  onClick={incrementCount}
                >
                  +
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors mb-2 sm:mb-0"
                  onClick={resetCount}
                >
                  Reset
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors"
                  onClick={decrementCount}
                >
                  -
                </button>
              </div>
            </div>

            {/* Second Counter */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="p-4 sm:p-8">
                <div
                  className={`text-4xl sm:text-6xl font-extrabold text-center mb-4 sm:mb-8 ${getCountColor(
                    count2
                  )} dark:text-white`}
                >
                  {count2}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-around p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors mb-2 sm:mb-0"
                  onClick={incrementCount2}
                >
                  +
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors mb-2 sm:mb-0"
                  onClick={resetCount2}
                >
                  Reset
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors"
                  onClick={decrementCount2}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="container mx-auto text-center">
          <Link
            to="/"
            className="text-blue-600 hover:underline dark:text-blue-400 font-medium"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Counter;