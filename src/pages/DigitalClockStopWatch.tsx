import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

interface Lap {
  id: number;
  time: string;
}

 const DigitalClockStopWatch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clock' | 'stopwatch'>('clock');

  // --- Clock State ---
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Clock Time
  const hours = is24Hour ? time.getHours() : time.getHours() % 12 || 12;
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // --- Stopwatch State ---
  const [swTime, setSwTime] = useState<number>(0);
  const [swRunning, setSwRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<Lap[]>([]);

  useEffect(() => {
    let interval: any = null;
    if (swRunning) {
      interval = setInterval(() => {
        setSwTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [swRunning]);

  const formatStopwatch = (ms: number) => {
    const getMinutes = String(Math.floor((ms / 60000) % 60)).padStart(2, '0');
    const getSeconds = String(Math.floor((ms / 1000) % 60)).padStart(2, '0');
    const getMilliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${getMinutes}:${getSeconds}.${getMilliseconds}`;
  };

  const handleStartStop = () => setSwRunning(!swRunning);
  const handleReset = () => {
    setSwRunning(false);
    setSwTime(0);
    setLaps([]);
  };
  const handleLap = () => {
    if (swTime === 0) return;
    setLaps((prev) => [{ id: prev.length + 1, time: formatStopwatch(swTime) }, ...prev]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back Link & Header */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline mb-2"
        >
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Clock & Stopwatch Suite
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Precision time tracking tools built with modern React hooks.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex justify-center">
        <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 flex gap-1">
          <button
            onClick={() => setActiveTab('clock')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'clock'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white'
            }`}
          >
            <i className="fa-solid fa-clock mr-2"></i> Digital Clock
          </button>
          <button
            onClick={() => setActiveTab('stopwatch')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'stopwatch'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white'
            }`}
          >
            <i className="fa-solid fa-stopwatch mr-2"></i> Stopwatch
          </button>
        </div>
      </div>

      {/* Tab 1: Digital Clock */}
      {activeTab === 'clock' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-8 animate-fadeIn">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold block">
              {formattedDate}
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-6xl sm:text-8xl font-black tracking-tight font-mono text-slate-900 dark:text-white">
                {String(hours).padStart(2, '0')}:{minutes}:{seconds}
              </span>
              {!is24Hour && (
                <span className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400 self-end pb-3 sm:pb-5">
                  {ampm}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setIs24Hour(!is24Hour)}
              className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors cursor-pointer"
            >
              Switch to {is24Hour ? '12-Hour' : '24-Hour'} Format
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Stopwatch */}
      {activeTab === 'stopwatch' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-8 animate-fadeIn">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold block">
              Precision Timer
            </span>
            <div className="text-6xl sm:text-8xl font-black tracking-tight font-mono text-slate-900 dark:text-white">
              {formatStopwatch(swTime)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleStartStop}
              className={`px-8 py-3.5 rounded-xl font-medium text-sm transition-all shadow-lg cursor-pointer ${
                swRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
              }`}
            >
              <i className={`fa-solid ${swRunning ? 'fa-pause' : 'fa-play'} mr-2`}></i>
              {swRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={handleLap}
              disabled={!swRunning}
              className="px-8 py-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium text-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fa-solid fa-flag mr-2"></i> Lap
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 font-medium text-sm transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-rotate-right mr-2"></i> Reset
            </button>
          </div>

          {/* Laps List */}
          {laps.length > 0 && (
            <div className="max-w-md mx-auto pt-6 border-t border-slate-200 dark:border-slate-800 space-y-2 max-h-60 overflow-y-auto">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-left mb-3">
                Recorded Laps
              </h3>
              {laps.map((lap) => (
                <div
                  key={lap.id}
                  className="flex justify-between items-center px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-sm font-mono text-slate-700 dark:text-slate-300"
                >
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">Lap {lap.id}</span>
                  <span>{lap.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DigitalClockStopWatch;