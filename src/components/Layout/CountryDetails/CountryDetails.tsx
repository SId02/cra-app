
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
interface Country {
  name: {
    common: string;
  };
  capital: string[];
  region: string;
  population: number;
  languages: {
    [key: string]: string;
  };
}

const CountryDetails: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [countryData, setCountryData] = useState<Country | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find(
        (country) => country.name.common === selectedCountry
      );
      setCountryData(country || null);
    } else {
      setCountryData(null);
    }
  }, [selectedCountry, countries]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <section className="py-6">
      <div className="container mx-auto text-center mb-5">
        <h1 className="text-3xl font-bold">Country Details</h1>
      </div>
      <div className="container mx-auto max-w-md">
        <div className="flex flex-col items-center">
          <div className="w-full mb-5">
            <select 
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">Select a country...</option>
              {countries.map((country) => (
                <option key={country.name.common} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>
          {countryData && (
            <div className="w-full bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold">{countryData.name.common}</h2>
              <hr className="my-4" />
              <p><strong>Capital:</strong> {countryData.capital.join(', ')}</p>
              <p><strong>Region:</strong> {countryData.region}</p>
              <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
              {Object.keys(countryData.languages).length > 0 && (
                <p><strong>Languages:</strong> {Object.values(countryData.languages).join(', ')}</p>
              )}
            </div>
          )}
        </div>
      </div>
      <footer className="flex justify-center mt-4">
                <Link to="/" className="text-blue-500 hover:underline">
                    Back to Home
                </Link>
            </footer>
    </section>
  );
};

export default CountryDetails;
