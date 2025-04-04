import React, { useState } from "react";
import { Link } from 'react-router-dom';

interface City {
  name: string;
  state: string;
}

const DataInTable: React.FC = () => {
  const [isTableVisible, setIsTableVisible] = useState(false);

  const cityListJSON = {
    cities: [
      { name: "Hyderabad", state: "Telangana" },
      { name: "Delhi", state: "Delhi" },
      { name: "Bangalore", state: "Karnataka" },
      { name: "Mumbai", state: "Maharashtra" },
      { name: "Chennai", state: "Tamil Nadu" },
      { name: "Thiruvananthapuram", state: "Kerala" },
    ] as City[],
  };

  const handleDisplayCities = () => {
    setIsTableVisible(true);
  };

  const renderCitiesTable = () => {
    const cities = cityListJSON.cities;

    return (
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">City</th>
            <th className="border border-gray-300 p-2">State</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => (
            <tr key={city.name} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{city.name}</td>
              <td className="border border-gray-300 p-2">{city.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <section className="py-6">
        <div className="container mx-auto text-center pb-5">
          <h1 className="text-2xl font-bold">Populate Data in Table</h1>
        </div>
        <div className="container mx-auto pt-5">
          <main>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleDisplayCities}
            >
              Display Capital Cities
            </button>
            <div className="p-5">
              {isTableVisible && renderCitiesTable()}
            </div>
          </main>
        </div>
      </section>
      <footer className="flex justify-center mt-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </footer>
    </>
  );
};

export default DataInTable;