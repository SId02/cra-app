import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

interface User {
  avatar_url: string;
  name: string;
  bio: string;
  html_url: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  company?: string;
  blog?: string;
  email?: string;
  created_at: string;
}

interface Repo {
  name: string;
  html_url: string;
}

const GithubUserProfileFinder: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (username) {
        try {
          const response = await axios.get<User>(`https://api.github.com/users/${username}`);
          setUser(response.data);
          const repoResponse = await axios.get<Repo[]>(`https://api.github.com/users/${username}/repos?per_page=5`);
          setRepos(repoResponse.data);
        } catch (err: any) {
          setError(err.message);
        }
      } else {
        setUser(null);
        setRepos([]);
        setError(null);
      }
    };
    fetchUser();
  }, [username]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const inputElement = document.querySelector<HTMLInputElement>("#username");
    if (inputElement) {
      setUsername(inputElement.value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Github User Profile Finder</h1>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                    Enter Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter Username"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>

              {user && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                  <div className="flex flex-col sm:flex-row items-center justify-center">
                    <div className="sm:w-1/3 text-center mb-4 sm:mb-0">
                      <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="rounded-full w-32 h-32 mx-auto"
                      />
                      <h2 className="text-xl font-semibold mt-2">{user.name}</h2>
                      <p className="mt-1">{user.bio}</p>
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Visit Github
                      </a>
                    </div>
                    <div className="sm:w-2/3 mt-4 sm:mt-0 sm:pl-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                          Public Repos: {user.public_repos}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                          Public Gists: {user.public_gists}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                          Followers: {user.followers}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                          Following: {user.following}
                        </span>
                      </div>
                      <ul className="list-disc list-inside">
                        {user.company && <li>Company: {user.company}</li>}
                        {user.blog && <li>Website: {user.blog}</li>}
                        {user.email && <li>Email: {user.email}</li>}
                        <li>Created at: {new Date(user.created_at).toLocaleDateString()}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <p className="mt-4 text-red-600 text-center">{error}</p>
              )}

              {user && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold mb-4">List Of Top Public Repositories</h2>
                  <ul className="list-disc list-inside">
                    {repos.map((repo, index) => (
                      <li key={index} className="mb-2">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {repo.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <footer className="flex justify-center mt-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </footer>
    </div>
  );
};

export default GithubUserProfileFinder;