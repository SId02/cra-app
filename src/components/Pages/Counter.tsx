import React, { useState } from "react";
import { Link } from "react-router-dom";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  let countColor = "text-gray-500";
  if (count > 0) {
    countColor = "text-green-500";
  } else if (count < 0) {
    countColor = "text-red-500";
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-semibold dark:text-white">Counter</h3>
        </div>
      </header>
      <main className="flex-grow p-4">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full md:w-8/12 lg:w-6/12">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className={`text-5xl font-bold text-center ${countColor} mb-6 dark:text-white`}>
                    {count}
                  </div>
                </div>
                <div className="flex justify-around p-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                    onClick={incrementCount}
                  >
                    Increment +
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded transition-colors"
                    onClick={resetCount}
                  >
                    Reset
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
                    onClick={decrementCount}
                  >
                    Decrement -
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="container mx-auto text-center">
          <Link to="/" className="text-blue-500 hover:underline dark:text-blue-400">
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Counter;