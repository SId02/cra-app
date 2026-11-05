import React, { useState } from 'react';
import { Link } from 'react-router';

export const UtilitiesDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ageYear' | 'validationBmi' |  'password'>('ageYear');

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <section className="py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Header & Back Link */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline mb-3"
            >
              <i className="fa-solid fa-arrow-left"></i> Back to Home
            </Link>
            <div className="text-center space-y-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Utilities Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Explore age calculations, BMI wellness checks and security tools.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setActiveTab('ageYear')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'ageYear'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <i className="fa-solid fa-hourglass-start mr-2"></i> Age & Year Calculator
            </button>
            <button
              onClick={() => setActiveTab('validationBmi')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'validationBmi'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <i className="fa-solid fa-heart-pulse mr-2"></i> Age & BMI Suite
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'password'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <i className="fa-solid fa-shield-halved mr-2"></i> Password Toggle
            </button>
          </div>
          {activeTab === 'ageYear' && <YearCalculatorComponent />}
          {activeTab === 'validationBmi' && <ValidationAndBmiComponent />}
          {activeTab === 'password' && <TogglePasswordComponent />}

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            to="/"
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            &larr; Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
};

const YearCalculatorComponent: React.FC = () => {
  const [date, setDate] = useState<string | number>(1);
  const [month, setMonth] = useState<string | number>(1);
  const [year, setYear] = useState<string | number>(1995);
  const [yearsResult, setYearsResult] = useState<string>('');

  const calculateYear = () => {
    let d = parseInt(String(date), 10);
    let m = parseInt(String(month), 10);
    let y = parseInt(String(year), 10);

    if (!d || !m || !y) {
      setYearsResult("Please enter a valid date, month, and year.");
      return;
    }

    let d2 = new Date().getDate();
    let m2 = 1 + new Date().getMonth();
    let y2 = new Date().getFullYear();
    let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if ((y2 % 4 === 0 && y2 % 100 !== 0) || y2 % 400 === 0) {
      monthDays[1] = 29;
    }

    if (y > y2 || (y === y2 && m > m2) || (y === y2 && m === m2 && d > d2)) {
      setYearsResult("You haven't been born yet!");
      return;
    }

    if (d > d2) {
      d2 = d2 + monthDays[m2 - 1];
      m2 = m2 - 1;
    }
    if (m > m2) {
      m2 = m2 + 12;
      y2 = y2 - 1;
    }

    const calculatedDays = d2 - d;
    const calculatedMonths = m2 - m;
    const calculatedYears = y2 - y;

    setYearsResult(`You are ${calculatedYears} Years, ${calculatedMonths} Months, and ${calculatedDays} Days old! 🎉`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">⏳ Exact Age & Year Calculator</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Calculate your exact chronological age down to the day.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Day (DD)</label>
          <input
            type="number"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min="1"
            max="31"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Month (MM)</label>
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            min="1"
            max="12"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Year (YYYY)</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="1900"
            max="3000"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="text-center pt-2">
        <button
          onClick={calculateYear}
          className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
        >
          Calculate Age 
        </button>
      </div>

      {yearsResult && (
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 text-center text-sm font-semibold">
          {yearsResult}
        </div>
      )}
    </div>
  );
};


const ValidationAndBmiComponent: React.FC = () => {
  // Age validation state
  const [ageInput, setAgeInput] = useState<string | number>('');
  const [ageMessage, setAgeMessage] = useState<string>('');

  // BMI state
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<string>('');
  const [bmiMessage, setBmiMessage] = useState<string>('');

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setAgeInput(e.target.value);

    if (isNaN(val)) {
      setAgeMessage("");
      return;
    }
    if (val < 18) {
      setAgeMessage("You are not yet 18 years old.");
    } else if (val >= 60 && val < 75) {
      setAgeMessage("You are a senior citizen aged 60 to 74 years old.");
    } else if (val >= 75) {
      setAgeMessage("You are a senior citizen aged 75 or above.");
    } else {
      setAgeMessage("You are an adult under 60 years old.");
    }
  };

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setBmiMessage("Invalid input. Please enter positive numbers only.");
      setBmi("");
      return;
    }

    const val = w / (h * h);
    setBmi(val.toFixed(2));

    if (val < 18.5) setBmiMessage(`Your BMI is ${val.toFixed(2)}. You are underweight.`);
    else if (val < 25) setBmiMessage(`Your BMI is ${val.toFixed(2)}. You are normal weight.`);
    else if (val < 30) setBmiMessage(`Your BMI is ${val.toFixed(2)}. You are overweight.`);
    else setBmiMessage(`Your BMI is ${val.toFixed(2)}. You are obese.`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Age Validation Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Age Category Validator</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Enter your age to determine your citizen bracket.</p>
        </div>
        <div className="space-y-4">
          <input
            type="number"
            value={ageInput}
            maxLength={3}
            onChange={handleAgeChange}
            placeholder="Enter age..."
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
          {ageMessage && (
            <div className={`p-4 rounded-xl text-xs font-semibold ${
              ageMessage.includes("18") ? 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400' : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'
            }`}>
              {ageMessage}
            </div>
          )}
        </div>
      </div>

      {/* BMI Calculator Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">BMI Calculator</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Check your body mass index.</p>
        </div>
        <div className="space-y-4">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight (kg)"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height (cm)"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={calculateBmi}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
          >
            Calculate BMI
          </button>
          {bmiMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-semibold text-center">
              {bmiMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TogglePasswordComponent: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 max-w-xl mx-auto">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Toggle Password Visibility</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Secure credential preview control.</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            value="P@ssword@123"
            readOnly
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none font-mono"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={passwordVisible}
            onChange={() => setPasswordVisible(!passwordVisible)}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <span>Show Password</span>
        </label>
      </div>
    </div>
  );
};

export default UtilitiesDashboard;