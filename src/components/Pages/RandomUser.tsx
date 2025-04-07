
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  location: {
    country: string;
  };
  picture: {
    large: string;
  };
}

interface ApiResponse {
  results: User[];
}

const USERS_TO_SHOW = 10;

const RandomUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true); // Track initial load

  useEffect(() => {
    const fetchInitialUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://randomuser.me/api/?page=${1}&results=${USERS_TO_SHOW}`);
        if (!response.ok) {
          throw new Error('Failed to fetch initial users');
        }
        const data: ApiResponse = await response.json();
        setUsers(data.results);
        setPage(2);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    if (initialLoad) {
      fetchInitialUsers();
    }
  }, [initialLoad]); 

  const handleLoadMore = () => {
    setLoading(true);
    setError(null);
    fetch(`https://randomuser.me/api/?page=${page}&results=${USERS_TO_SHOW}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch more users');
        }
        return response.json();
      })
      .then((data: ApiResponse) => {
        setUsers((prevUsers) => [...prevUsers, ...data.results]);
        setPage(page + 1);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Random Users</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading && initialLoad && <div className="text-blue-500 mb-4">Loading initial users...</div>}
        {loading && !initialLoad && <div className="text-blue-500 mb-4">Loading more users...</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <img
                className="rounded float-left mr-4"
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <h2 className="text-lg font-semibold">
                {user.name.first} {user.name.last}
              </h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.location.country}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
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

export default RandomUsers;