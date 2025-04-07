
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  population: number;
  region: string;
  capital: string[];
}

const Typeahead: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>("https://restcountries.com/v3.1/all");
        const transformedCountries = response.data.map(country => ({
          name: country.name,
          flags: country.flags,
          population: country.population,
          region: country.region,
          capital: country.capital,
        }));
        setCountries(transformedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value) {
      setSelectedCountry(null);
    }
  };

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    setSearchTerm('');
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 md:p-8">
        <h3 className="text-2xl font-bold text-center mb-4">Typeahead</h3>
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Type Country Name"
            className="w-full md:w-2/3 lg:w-1/2 border rounded p-2 mb-2"
          />

          {selectedCountry && (
            <div className="mt-4 p-4 border rounded shadow-md w-full md:w-2/3 lg:w-1/2">
              <h2 className="text-xl font-semibold mb-2">{selectedCountry.name.common}</h2>
              <img
                src={selectedCountry.flags.png}
                alt={selectedCountry.name.common}
                className="w-24 h-auto mx-auto mb-2"
              />
              <ul className="list-disc list-inside">
                <li>
                  <strong>Population:</strong> {selectedCountry.population.toLocaleString()}
                </li>
                <li>
                  <strong>Region:</strong> {selectedCountry.region}
                </li>
                <li>
                  <strong>Capital:</strong> {selectedCountry.capital.join(", ")}
                </li>
              </ul>
            </div>
          )}

          {searchTerm && !selectedCountry && filteredCountries.length > 0 && (
            <ul className="mt-2 w-full md:w-2/3 lg:w-1/2 border rounded shadow-md">
              {filteredCountries.map((country) => (
                <li
                  key={country.name.common}
                  onClick={() => handleSelect(country)}
                  className={`p-2 cursor-pointer hover:bg-gray-100`}
                >
                  {country.name.common}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <footer className="mt-auto p-4 text-center">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </footer>
    </div>
  );
};

export default Typeahead;
