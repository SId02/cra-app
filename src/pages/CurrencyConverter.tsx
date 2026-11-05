import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

interface ExchangeRates {
  [currency: string]: number;
}

export const CurrencyConverter: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [amount, setAmount] = useState<number | string>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        if (!response.ok) throw new Error("Failed to fetch exchange rates");
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error in fetching currency exchange rate:", error);
      }
    };

    fetchRates();
  }, [fromCurrency]);

  useEffect(() => {
    const conversionRate = exchangeRates[toCurrency];
    if (conversionRate && typeof amount === 'number' || (typeof amount === 'string' && !isNaN(Number(amount)))) {
      const converted = Number(amount) * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "amount":
        setAmount(value);
        break;
      case "fromCurrency":
        setFromCurrency(value);
        break;
      case "toCurrency":
        setToCurrency(value);
        break;
      default:
        break;
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
                Currency Converter
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Real-time currency exchange rates and conversions worldwide.
              </p>
            </div>
          </div>

          {/* Converter Card */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* From Currency */}
              <div>
                <label htmlFor="fromCurrency" className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  From Currency
                </label>
                <div className="relative">
                  <select
                    id="fromCurrency"
                    name="fromCurrency"
                    value={fromCurrency}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                  >
                    {Object.keys(exchangeRates).map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </span>
                </div>
              </div>

              {/* To Currency */}
              <div>
                <label htmlFor="toCurrency" className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  To Currency
                </label>
                <div className="relative">
                  <select
                    id="toCurrency"
                    name="toCurrency"
                    value={toCurrency}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                  >
                    {Object.keys(exchangeRates).map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </span>
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label htmlFor="amt" className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  id="amt"
                  name="amount"
                  placeholder="0.00"
                  value={amount}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Converted Amount Output */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Converted Amount
                </label>
                <div className="w-full px-4 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-indigo-600 dark:text-indigo-400 font-bold flex items-center">
                  {convertedAmount ? `${convertedAmount} ${toCurrency}` : '—'}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default CurrencyConverter;