//open weather forecasting site

import React, { useState } from 'react';
import weather from './Images/weather.jpg';

function App() {
  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8001/weather?city=${encodeURIComponent(city)}`); //agar kisine alag alag style yarr uppercase lowercse se likha toh 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeatherInfo(data);
      setError('');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error while fetching weather data:', error);
      setError('Could not fetch weather data. Please try again.');
      setWeatherInfo(null);
    }
  };

  return (
    <div className="h-screen relative">
      <img className="h-full w-full object-cover" src={weather} alt="Weather Background" />

      {!isSubmitted ? (
        <form
          className="absolute bottom-64 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-30 p-14 rounded"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Get Weather
          </button>
        </form>
      ) : (  //or
        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 p-8 rounded shadow-lg w-3/4 max-w-lg">
          <h2 className="text-xl font-bold mb-2">{weatherInfo.cityName}, {weatherInfo.state}</h2>
          <p className="text-3xl font-bold mt-4">{weatherInfo.temperature} °C</p>
          <p className="mt-2 text-lg">{weatherInfo.condition}</p>
          <p className="mt-2">Humidity: <span className="font-semibold">{weatherInfo.humidity}%</span></p>
          <p className="mt-2">Wind Speed: <span className="font-semibold">{weatherInfo.windSpeed} km/h</span></p>
          <p className="mt-2">Feels Like: <span className="font-semibold">{weatherInfo.feelsLike} °C</span></p>
          <p className="mt-2">Visibility: <span className="font-semibold">{weatherInfo.visibility} km</span></p>
          <p className="mt-2">Sunrise: <span className="font-semibold">{weatherInfo.sunrise}</span></p>
          <p className="mt-2">Sunset: <span className="font-semibold">{weatherInfo.sunset}</span></p>
          <p className="mt-2 text-lg">{new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}</p>
          <button
            className="mt-4 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
            onClick={() => setIsSubmitted(false)}
          >
            Search Another City
          </button>
        </div>
      )}

    
    </div>
  );
}

export default App;

