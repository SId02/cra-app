import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar  from './components/Navbar/Navbar';
import Footer  from './components/Footer/Footer';
import Home from './pages/Home';
import About  from './pages/About';
import Contact  from './pages/Contact';
import GridList from './pages/GridList';
import WeatherChecker from './pages/WeatherChecker';
import WordCounter from './pages/WordCounter';
import LoginDemo from './pages/LoginDemo';
import LoginDemoWithApi from './pages/LoginDemoWithApi';
import ColorGenerator from './pages/ColorGenerator';
import CRUDStudentComponent from './pages/CRUDStudentComponent';
import CurrencyConverter from './pages/CurrencyConverter';
import DigitalClockStopWatch from './pages/DigitalClockStopWatch';
import DragDrop from './pages/DragDrop';
import DynamicForm from './pages/DynamicForm';
import GithubUserProfileFinder from './pages/GithubUserProfileFinder';
import InfiniteScroll from './pages/InfiniteScroll';
import PokemonDash from './pages/PokemonDash';
import PostsManager from './pages/PostsManager';
import RandomUsers from './pages/RandomUsers';
import UtilitiesDashboard from './pages/UtilitiesDashboard';
import ProductListSearchSortFilter from "./pages/ProductListSearchSortFilter";
const App: React.FC = () => {
  // Initialize user theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ColorGenerator" element={<ColorGenerator />} />
            <Route path="/GridList" element={<GridList />} />
            <Route path="/weatherchecker" element={<WeatherChecker />} />
            <Route path="/WordCounter" element={<WordCounter />} />
            <Route path="/LoginDemo" element={<LoginDemo />} />
            <Route path="/LoginDemoWithApi" element={<LoginDemoWithApi />} />
            <Route path="/CRUDStudentComponent" element={<CRUDStudentComponent />} />
            <Route path="/DigitalClockStopWatch" element={<DigitalClockStopWatch />} />
            <Route path="/CurrencyConverter" element={<CurrencyConverter />} />
            <Route path="/DragDrop" element={<DragDrop />} />
            <Route path="/DynamicForm" element={<DynamicForm />} />
            <Route path="/GithubUserProfileFinder" element={<GithubUserProfileFinder />} />
            <Route path="/InfiniteScroll" element={<InfiniteScroll />} />
            <Route path="/PokemonDash" element={<PokemonDash />} />
            <Route path="/PostsManager" element={<PostsManager />} />
            <Route path="/RandomUsers" element={<RandomUsers />} />
            <Route path="/UtilitiesDashboard" element={<UtilitiesDashboard />} />
            <Route path="/ProductListSearchSortFilter" element={<ProductListSearchSortFilter />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;