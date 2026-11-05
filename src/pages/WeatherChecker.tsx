import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

const weatherDescriptions: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Drizzle: Light",
  61: "Rain: Slight",
  63: "Rain: Moderate",
  65: "Rain: Heavy",
  80: "Rain showers: Slight",
  95: "Thunderstorm",
  99: "Thunderstorm: Heavy hail",
};

const topWorldCities: string[] = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Dubai",
  "Singapore",
  "Hong Kong",
  "Sydney",
  "Los Angeles",
];

const topIndiaCities: string[] = [
  "Agartala",
  "Aizawl",
  "Amaravati",
  "Ahmedabad",
  "Bengaluru",
  "Bhopal",
  "Bhubaneswar",
  "Chandigarh",
  "Chennai",
  "Dehradun",
  "Delhi",
  "Gangtok",
  "Ghaziabad",
  "Guwahati",
  "Hyderabad",
  "Imphal",
  "Indore",
  "Itanagar",
  "Jaipur",
  "Jammu",
  "Kanpur",
  "Kohima",
  "Kolkata",
  "Lucknow",
  "Mumbai",
  "Nagpur",
  "Panaji",
  "Patna",
  "Port Blair",
  "Pune",
  "Raipur",
  "Ranchi",
  "Shillong",
  "Shimla",
  "Srinagar",
  "Surat",
  "Thane",
  "Thiruvananthapuram",
  "Vadodara",
  "Visakhapatnam",
];

const fetchWeatherForCity = async (cityName: string): Promise<WeatherData | null> => {
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`
    );
    const geoData = await geoRes.json();

    if (geoData.results && geoData.results.length > 0) {
      const { latitude, longitude, name, country } = geoData.results[0];
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      return {
        city: name,
        country,
        ...weatherData.current_weather,
      };
    }
    return null;
  } catch (err) {
    return null;
  }
};

 const WeatherChecker: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [worldCitiesWeather, setWorldCitiesWeather] = useState<WeatherData[]>([]);
  const [indiaCitiesWeather, setIndiaCitiesWeather] = useState<WeatherData[]>([]);
  const [loadingTopCities, setLoadingTopCities] = useState<boolean>(true);

  const [showWorldCities, setShowWorldCities] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllCitiesWeather = async () => {
      setLoadingTopCities(true);
      const worldPromises = topWorldCities.map(fetchWeatherForCity);
      const indiaPromises = topIndiaCities.map(fetchWeatherForCity);

      const worldResults = await Promise.all(worldPromises);
      const indiaResults = await Promise.all(indiaPromises);

      setWorldCitiesWeather(worldResults.filter((item): item is WeatherData => item !== null));
      setIndiaCitiesWeather(indiaResults.filter((item): item is WeatherData => item !== null));
      setLoadingTopCities(false);
    };

    fetchAllCitiesWeather();
  }, []);

  const getCoordinates = async (cityName: string) => {
    setErrorMessage("");
    setWeatherData(null);
    setLoading(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { latitude, longitude, name, country } = data.results[0];
        getWeather(latitude, longitude, name, country);
      } else {
        throw new Error("Location not found");
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error.message || "Location not found");
    }
  };

  const getWeather = async (latitude: number, longitude: number, cityName: string, country: string) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const data = await response.json();
      setWeatherData({ ...data.current_weather, city: cityName, country });
    } catch (error) {
      setErrorMessage("Weather data not available");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      getCoordinates(city);
    } else {
      setErrorMessage("Please enter a city name");
    }
  };

  const handleCitySuggestion = (cityName: string) => {
    setCity(cityName);
    getCoordinates(cityName);
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-100 via-indigo-50 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Main Container Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-8 space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto text-3xl shadow-sm">
              <i className="fas fa-cloud-sun"></i>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Weather Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Real-time global & regional weather insights powered by Open-Meteo
            </p>
          </div>

          {/* Search Bar Section */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative grow">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 shadow-sm"
                  type="text"
                  placeholder="Search any city (e.g., Tokyo, London)..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <button
                className={`px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : null}
                Search
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="max-w-md mx-auto mb-8 p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-center text-sm flex items-center justify-center gap-2">
              <i className="fas fa-exclamation-circle"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Searched Weather Result Highlight Card */}
          {weatherData && !loading && (
            <div className="max-w-md mx-auto mb-10 p-6 rounded-3xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
              
              <div className="text-center mb-6 relative z-10">
                <h3 className="text-xl font-bold flex items-center justify-center gap-2 mb-2">
                  <i className="fas fa-map-marker-alt"></i>
                  {weatherData.city}, {weatherData.country}
                </h3>
                
                <div className="flex items-center justify-center gap-4 my-4">
                  <i className="fas fa-temperature-high text-4xl text-amber-300 drop-shadow-md"></i>
                  <span className="text-5xl font-black drop-shadow-md">
                    {weatherData.temperature}°C
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white">
                  <i className="fas fa-cloud"></i>
                  {weatherDescriptions[weatherData.weathercode] || "Unknown Condition"}
                </span>
              </div>

              <div className="pt-4 border-t border-white/20 flex justify-center items-center text-sm">
                <p className="flex items-center gap-2 font-medium">
                  <i className="fas fa-wind"></i> Wind Speed: {weatherData.windspeed} km/h
                </p>
              </div>
            </div>
          )}

          {/* Toggle Buttons for Cities */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                showWorldCities
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              onClick={() => setShowWorldCities(true)}
            >
              <i className="fas fa-globe"></i>
              <span>Top World Cities</span>
            </button>
            <button
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                !showWorldCities
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              onClick={() => setShowWorldCities(false)}
            >
              <i className="fas fa-landmark"></i>
              <span>Top Indian Cities</span>
            </button>
          </div>

          {/* City Weather Cards Grid */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 text-center">
              {showWorldCities ? "🌎 Popular Cities Worldwide" : "🇮🇳 Popular Cities in India"}
            </h2>

            {loadingTopCities ? (
              <div className="flex justify-center items-center py-16">
                <i className="fas fa-spinner fa-spin text-3xl text-indigo-600"></i>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(showWorldCities ? worldCitiesWeather : indiaCitiesWeather).map((data) => (
                  <div
                    key={data.city}
                    onClick={() => handleCitySuggestion(data.city)}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-500/50 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <strong className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {data.city}
                        </strong>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300 font-medium">
                          {data.country}
                        </span>
                      </div>

                      <div className="flex items-center my-3">
                        <span className="text-amber-500 mr-2 text-lg">
                          <i className="fas fa-thermometer-half"></i>
                        </span>
                        <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                          {data.temperature}°C
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400">
                      <p className="flex items-center gap-1.5 truncate">
                        <i className="fas fa-cloud text-indigo-500"></i>
                        {weatherDescriptions[data.weathercode] || "Unknown"}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <i className="fas fa-wind text-indigo-500"></i>
                        {data.windspeed} km/h
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Attribution */}
          <div className="text-center mt-12 pt-6 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Powered by{" "}
              <Link
                to="https://open-meteo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Open-Meteo API
              </Link>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WeatherChecker;