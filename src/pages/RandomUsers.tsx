import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

interface User {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  location: { country: string };
  picture: { large: string };
}

const USERS_TO_SHOW = 10;

export const RandomUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    const fetchInitialUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://randomuser.me/api/?page=1&results=${USERS_TO_SHOW}`);
        if (!response.ok) {
          throw new Error("Failed to fetch initial users");
        }
        const data = await response.json();
        setUsers(data.results);
        setPage(2);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    if (initialLoad) {
      fetchInitialUsers();
    }
  }, [initialLoad]);

  const handleLoadMore = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://randomuser.me/api/?page=${page}&results=${USERS_TO_SHOW}`);
      if (!response.ok) {
        throw new Error("Failed to fetch more users");
      }
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, ...data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        
        {/* Back Link & Header */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline mb-2"
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Random Users Directory
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Explore profile records fetched dynamically via the Random User API.
            </p>
          </div>
        </div>

        {/* Notifications / Errors */}
        {error && (
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-center text-sm">
            <i className="fa-solid fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

        {initialLoad && loading && (
          <div className="text-center py-16">
            <i className="fa-solid fa-spinner fa-spin text-3xl text-indigo-600"></i>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Loading initial users...
            </p>
          </div>
        )}

        {/* Users Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user.login.uuid}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 hover:shadow-xl dark:hover:border-indigo-500 transition-all duration-300 flex flex-col items-center text-center justify-between group"
            >
              <div className="w-full flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={user.picture.large}
                    alt={`${user.name.first} ${user.name.last}`}
                    className="w-24 h-24 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="mb-4 w-full">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {user.name.first} {user.name.last}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 break-all px-2">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {user.location.country}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {!initialLoad && (
          <div className="text-center pt-4">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-lg shadow-indigo-600/20 transition-all cursor-pointer inline-flex items-center gap-2 disabled:opacity-50"
            >
              {loading && <i className="fa-solid fa-spinner fa-spin"></i>}
              <span>{loading ? "Loading..." : "Load More Users"}</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default RandomUsers;