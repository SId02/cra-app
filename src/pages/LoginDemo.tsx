import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function LoginDemo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'demo@mail.com' && password === 'demo@123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials. Use demo@mail.com and demo@123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  if (isLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">
          <i className="fa-solid fa-check"></i>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome, Demo User!</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          You have successfully signed in using the demo credentials.
        </p>
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
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 mx-auto mb-3">
          <i className="fa-solid fa-lock text-lg"></i>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Demo Login</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Test authentication flow</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-medium text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="demo@mail.com"
            required
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="demo@123"
            required
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/25 transition-all cursor-pointer mt-2"
        >
          Sign In
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
        <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Demo Credentials:</p>
        <p>Email: <span className="font-mono text-indigo-600 dark:text-indigo-400">demo@mail.com</span></p>
        <p>Password: <span className="font-mono text-indigo-600 dark:text-indigo-400">demo@123</span></p>
      </div>
    </div>
  );
}