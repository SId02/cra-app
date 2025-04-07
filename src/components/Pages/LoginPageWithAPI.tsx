
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const LoginPageWithAPI: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });
      if (response.data) {
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <>
    <div className="p-5">
      {isLoggedIn ? (
        <section className="hero bg-blue-500 text-white">
          <div className="hero-body">
            <p className="title text-center">Welcome {username}</p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="container mx-auto">
          <h1 className="text-center text-4xl mb-5">Login using API</h1>
          {errorMessage && (
            <div className="bg-red-500 text-white p-3 rounded mb-3 text-center">
              {errorMessage}
            </div>
          )}
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-md">
              <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                  <input
                      type="text"
                      placeholder="USERNAME"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
     <footer className="flex justify-center mt-4">
     <Link to="/" className="text-blue-500 hover:underline">
         Back to Home
     </Link>
 </footer>
    </>
  );
};

export default LoginPageWithAPI;


