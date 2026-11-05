import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export const GridList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isGrid, setIsGrid] = useState<boolean>(false);

  // Fetch API on component load
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Limit to top 15 users
  const top15Users = users.slice(0, 15);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 lg:pt-24 lg:pb-16 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-6">
            <i className="fa-solid fa-bolt"></i> Live API Data Stream
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Top 15 Directory powered by <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">JSONPlaceholder</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Fetched live on load. Toggle instantly between a structured list and a modern responsive grid view.
          </p>
        </div>
      </section>

      {/* Directory Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Active Users Directory</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Showing top 15 records from remote API</p>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setIsGrid(!isGrid)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <i className={`fa-solid ${isGrid ? 'fa-list-ul' : 'fa-grip'}`}></i>
            <span>{isGrid ? 'Switch to List View' : 'Switch to Grid View'}</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <i className="fa-solid fa-spinner fa-spin text-3xl text-indigo-600"></i>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-center text-sm">
            Error loading data: {error}
          </div>
        )}

        {/* Content View: List or Grid */}
        {!loading && !error && (
          <div className={isGrid ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {top15Users.map((user) => (
              <div
                key={user.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                      #{user.id}
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                      {user.company.name}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{user.name}</h3>
                  <div className="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                    <p className="flex items-center gap-2">
                      <i className="fa-solid fa-envelope w-4 text-indigo-500"></i> {user.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <i className="fa-solid fa-phone w-4 text-indigo-500"></i> {user.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <i className="fa-solid fa-globe w-4 text-indigo-500"></i> {user.website}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default GridList;