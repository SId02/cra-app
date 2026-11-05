import React, { useState } from "react";
import { Link } from "react-router";

const projects = [
  { path: "/GridList", name: "GridList" },
  { path: "/WordCounter", name: "Word Counter" },
  { path: "/WeatherChecker", name: "Weather Checker" },
  { path: "/ColorGenerator", name: "Color Generator" },
  { path: "/LoginDemo", name: "Login Demo" },
  { path: "/LoginDemoWithApi", name: "LoginDemoWithApi" },
  { path: "/CRUDStudentComponent", name: "CRUDStudentComponent" },
  { path: "/DigitalClockStopWatch", name: "DigitalClockStopWatch" },
  { path: "/CurrencyConverter", name: "CurrencyConverter" },
  { path: "/DragDrop", name: "DragDrop" },
  { path: "/DynamicForm", name: "DynamicForm" },
  { path: "/GithubUserProfileFinder", name: "GithubUserProfileFinder" },
  { path: "/InfiniteScroll", name: "InfiniteScroll" },
  { path: "/PokemonDash", name: "PokemonDash" },
  { path: "/PostsManager", name: "PostsManager" },
  { path: "/RandomUsers", name: "RandomUsers" },
  { path: "/UtilitiesDashboard", name: "UtilitiesDashboard" },
  { path: "/ProductListSearchSortFilter", name: "ProductListSearchSortFilter" },
];

const Home: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const handleToggleProjects = () => {
    if (visibleCount >= projects.length) {
      // If all are shown, reset back to initial 6
      setVisibleCount(6);
    } else {
      // Otherwise, reveal 3 more projects
      setVisibleCount((prev) => Math.min(prev + 3, projects.length));
    }
  };

  const displayedProjects = projects.slice(0, visibleCount);
  const allShown = visibleCount >= projects.length;

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-500/10 dark:bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-6">
            <i className="fa-solid fa-sparkles"></i> React 19 & Tailwind v4
          </span>
          <h1 className="max-w-5xl mx-auto leading-tight tracking-tight">
            <span className="block text-xl sm:text-2xl lg:text-3xl font-medium text-slate-600 dark:text-slate-400 mb-2">
              This platform showcases a collection of applications built with
            </span>
            <span className="text-3xl sm:text-5xl lg:text-6xl font-extrabold bg-linear-to-r from-indigo-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              React , TypeScript, React Router , and Tailwind CSS
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Dive in to explore implementations frontend patterns, including
            dynamic API integrations, complete CRUD operations, and advanced
            client-side routing. You can learn more about the underlying tech
            stack by visiting the official documentation link is below.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-base shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              React <i className="fa-solid fa-arrow-right text-sm"></i>
            </a>
            <a
              href="https://reactrouter.com/home"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium text-base transition-colors flex items-center justify-center gap-2"
            >
              React Router <i className="fa-solid fa-arrow-right text-sm"></i>
            </a>
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium text-base transition-colors flex items-center justify-center gap-2"
            >
              Tailwind CSS <i className="fa-solid fa-arrow-right text-sm"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block">
            Interactive Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Explore Projects
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Select any project card below to view its live implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedProjects.map((project, index) => (
            <Link
              key={index}
              to={project.path}
              className="group p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:shadow-lg dark:hover:border-indigo-500 transition-all duration-300 flex items-center justify-center text-center min-h-20"
            >
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {project.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Toggle Button (Show More / Show Less) */}
        <div className="mt-12 text-center">
          <button
            onClick={handleToggleProjects}
            className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-lg shadow-indigo-600/20 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>{allShown ? "Show Less" : "Show More Projects"}</span>
            <i
              className={`fa-solid ${allShown ? "fa-chevron-up" : "fa-chevron-down"} text-xs`}
            ></i>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
