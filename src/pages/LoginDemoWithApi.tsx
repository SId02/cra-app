
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function LoginDemoWithApi() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch a random valid test user from DummyJSON API on component mount
  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=5')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.users && data.users.length > 0) {
          // Pick a random user from the fetched list
          const randomUser = data.users[Math.floor(Math.random() * data.users.length)];
          setUsername(randomUser.username);
          setPassword(randomUser.password); // DummyJSON users include their test passwords
        } else {
          // Fallback default if list is empty
          setUsername('emilys');
          setPassword('emilyspass');
        }
        setFetchingUser(false);
      })
      .catch(() => {
        // Fallback safety net if network fails
        setUsername('emilys');
        setPassword('emilyspass');
        setFetchingUser(false);
      });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      setUser(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong during login.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner">
          <i className="fa-solid fa-check"></i>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome, {user.firstName || user.username}!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Successfully authenticated via DummyJSON API.
          </p>
        </div>

        {/* Display fetched user details */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2">
          <p><span className="font-semibold text-slate-700 dark:text-slate-300">Email:</span> {user.email}</p>
          <p><span className="font-semibold text-slate-700 dark:text-slate-300">Gender:</span> {user.gender}</p>
          <p><span className="font-semibold text-slate-700 dark:text-slate-300">Token:</span> <span className="font-mono text-indigo-600 dark:text-indigo-400 truncate block">{user.accessToken?.substring(0, 30)}...</span></p>
        </div>

        <div className="flex gap-4 justify-center pt-2">
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition shadow-md cursor-pointer"
          >
            Logout
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 font-medium text-sm transition cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-16 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 mx-auto mb-3">
          <i className="fa-solid fa-cloud-arrow-up text-lg"></i>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">API Login Demo</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Fetched live from DummyJSON server</p>
      </div>

      {/* Live API Credentials Display Box */}
      <div className="mb-6 p-3.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 text-center">
        <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-1">
          <i className="fa-solid fa-key mr-1"></i> Live API Credentials Generated:
        </p>
        {fetchingUser ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 py-1">Loading live credentials...</p>
        ) : (
          <div className="text-xs text-slate-700 dark:text-slate-300 font-mono space-x-2">
            <span>User: <strong>{username}</strong></span>
            <span>•</span>
            <span>Pass: <strong>{password}</strong></span>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-medium text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading || fetchingUser}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/25 transition-all cursor-pointer mt-2 disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In via API'}
        </button>
      </form>
    </div>
  );
}