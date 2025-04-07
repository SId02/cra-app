import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const YearCalculator: React.FC = () => {
  const [date, setDate] = useState<number>(1);
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(1900);
  const [years, setYears] = useState<string>('');

  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const calculateYear = () => {
    let d2 = new Date().getDate();
    let m2 = new Date().getMonth() + 1; 
    let y2 = new Date().getFullYear();
  
    const monthDays = [31,isLeapYear(year) ? 29 : 28,31,30,31,30,31,31,30,31,30, 31];

    if (date > d2 && month >= m2 && year >= y2) {
      setYears("You haven't been born yet!");
      return;
    }

    if (date > d2) {
      d2 += monthDays[m2 - 1]; 
      m2 -= 1; 
    }
    
    if (month > m2) {
      m2 += 12; 
      y2 -= 1; 
    }

    const d = d2 - date;
    const m = m2 - month;
    const y = y2 - year;
    setYears(`Years: ${y} Years ${m} Months ${d} Days`);
  };
  return (
    <>
    <section className="py-6">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold">Year Calculator</h1>
      </div>
      <div className="container mx-auto pt-5">
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-1/3">
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Enter in Day</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="number"
                placeholder="DD"
                required
                min={1}
                max={new Date(year, month, 0).getDate()}
                value={date}
                onChange={(e) => setDate(Number(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="month" className="block text-gray-700 text-sm font-bold mb-2">Enter in Month</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="month"
                type="number"
                placeholder="MM"
                required
                min={1}
                max={12}
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">Enter in Year</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="year"
                type="number"
                placeholder="YYYY"
                required
                min={1900}
                max={3000}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={calculateYear}
              >
                Calculate
              </button>
            </div>
            <h4 className="text-center mt-5">{years}</h4>
          </form>
        </div>
      </div>
    </section>
      <footer className="flex justify-center mt-4">
      <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
      </Link>
  </footer>
    </>
  );
}

export default YearCalculator;
