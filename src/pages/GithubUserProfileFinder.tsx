import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
  company: string | null;
  blog: string | null;
  location: string | null;
  created_at: string;
}

interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}

export const GithubUserProfileFinder: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      if (!username) return;

      setLoading(true);
      setError(null);
      setUser(null);
      setRepos([]);

      try {
        const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
        if (!userRes.ok) {
          throw new Error("User not found or API rate limit exceeded.");
        }
        const userData: GithubUser = await userRes.json();
        setUser(userData);

        const repoRes = await fetch(
          `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=5&sort=updated`
        );
        if (repoRes.ok) {
          const repoData: GithubRepo[] = await repoRes.json();
          setRepos(repoData);
        }
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [username]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      setUsername(inputValue.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <section className="py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Header & Back Link */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline mb-3"
            >
              <i className="fa-solid fa-arrow-left"></i> Back to Home
            </Link>
            <div className="text-center space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                GitHub User Profile Finder
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Search any GitHub handle to view profile statistics and top repositories.
              </p>
            </div>
          </div>

          {/* Search Box Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-brands fa-github"></i>
                </span>
                <input
                  type="text"
                  placeholder="Enter GitHub Username (e.g., torvalds)..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 shadow-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center disabled:opacity-50"
              >
                {loading && <i className="fa-solid fa-spinner fa-spin mr-2"></i>}
                Search
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-center text-sm flex items-center justify-center gap-2">
              <i className="fa-solid fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <i className="fa-solid fa-spinner fa-spin text-3xl text-indigo-600"></i>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Fetching GitHub profile...
              </p>
            </div>
          )}

          {/* User Profile Card */}
          {user && !loading && (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                
                {/* Avatar Column */}
                <div className="flex flex-col items-center text-center shrink-0">
                  <img
                    src={user.avatar_url}
                    alt={user.name || user.login}
                    className="w-32 h-32 rounded-full object-cover shadow-lg border-2 border-indigo-500/30 mb-4"
                  />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {user.name || user.login}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">@{user.login}</p>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-xs font-semibold transition-colors"
                  >
                    View GitHub Profile
                  </a>
                </div>

                {/* Details Column */}
                <div className="flex-grow space-y-4 w-full">
                  {user.bio && (
                    <p className="text-sm italic text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl">
                      "{user.bio}"
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                      Public Repos: {user.public_repos}
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                      Followers: {user.followers}
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                      Following: {user.following}
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                      Gists: {user.public_gists}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                    {user.company && (
                      <li className="flex items-center gap-2">
                        <i className="fa-solid fa-building w-4 text-indigo-500"></i>
                        <span><strong>Company:</strong> {user.company}</span>
                      </li>
                    )}
                    {user.blog && (
                      <li className="flex items-center gap-2 truncate">
                        <i className="fa-solid fa-globe w-4 text-indigo-500"></i>
                        <span><strong>Website:</strong>{" "}</span>
                        <a
                          href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 dark:text-indigo-400 hover:underline truncate"
                        >
                          {user.blog}
                        </a>
                      </li>
                    )}
                    {user.location && (
                      <li className="flex items-center gap-2">
                        <i className="fa-solid fa-location-dot w-4 text-indigo-500"></i>
                        <span><strong>Location:</strong> {user.location}</span>
                      </li>
                    )}
                    <li className="flex items-center gap-2">
                      <i className="fa-solid fa-calendar w-4 text-indigo-500"></i>
                      <span><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Top Repositories Section */}
          {user && repos.length > 0 && !loading && (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Top Public Repositories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {repos.map((repo) => (
                  <div
                    key={repo.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-500 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2 mb-2 text-sm"
                      >
                        <i className="fa-solid fa-book-bookmark"></i>
                        {repo.name}
                      </a>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {repo.description || "No description provided."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default GithubUserProfileFinder;