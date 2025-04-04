
import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
import { Link } from 'react-router-dom';
   
const RandomJokes: React.FC = () => {
  const [joke, setJoke] = useState<string>('Loading a hilarious joke...');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateJoke = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://icanhazdadjoke.com', {
        headers: {
          'Accept': 'application/json'
        }
      });

      setJoke(response.data.joke);
    } catch (err) {
      setError('Failed to fetch joke. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateJoke();
  }, []);

  return (
    <>
    <section className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-5">Random Jokes</h1>
      
      <div className={`bg-gray-200 p-4 rounded-lg shadow-md w-full max-w-md text-center ${isLoading ? 'bg-gray-300' : error ? 'bg-red-300' : ''}`}>
        <p className="text-lg">{error ? error : joke}</p>
      </div>

      <button 
        className={`mt-4 p-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={generateJoke}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Get Next Joke >'}
      </button>
    </section>
    <footer className="flex justify-center mt-4">
 <Link to="/" className="text-blue-500 hover:underline">
     Back to Home
 </Link>
</footer>
    </>
  );
};

export default RandomJokes;
