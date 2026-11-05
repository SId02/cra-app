
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block">
          About The Platform
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          React 19 & Tailwind v4
        </h1>
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          This platform showcases a collection of projects/snippets built with React, TypeScript, React Router, and Tailwind CSS.
        </p>
      </div>

      {/* Grid info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Explore the Architecture</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Dive in to explore implementations frontend patterns, including dynamic API integrations, complete CRUD operations, and advanced client-side routing. You can learn more about the underlying tech stack by visiting the official documentation links below.
          </p>
          <ul className="space-y-4 text-slate-700 dark:text-slate-300 font-medium">
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-circle-check text-indigo-600"></i> Dynamic API Integrations
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-circle-check text-indigo-600"></i> Complete CRUD Operations
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-circle-check text-indigo-600"></i> Advanced Client-Side Routing
            </li>
          </ul>
        </div>

        <div className="bg-linear-to-tr from-indigo-600 to-violet-500 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          <h3 className="text-2xl font-bold">Official Documentation</h3>
          <p className="text-indigo-100 text-sm leading-relaxed">
            Check out the official guides and resources for the core libraries powering this application.
          </p>
          <div className="flex flex-wrap gap-4 pt-4 border-t border-indigo-400/30">
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-colors shadow-md flex items-center gap-2"
            >
              React <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
            <a
              href="https://reactrouter.com/home"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-colors shadow-md flex items-center gap-2"
            >
              React Router <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-colors shadow-md flex items-center gap-2"
            >
              Tailwind CSS <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;