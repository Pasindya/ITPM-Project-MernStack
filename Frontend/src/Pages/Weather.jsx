import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Weather.css'; // Import CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloud,
  faCloudRain,
  faSnowflake,
  faBolt,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';

function Weather() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTime, setSearchTime] = useState(null); // State to store the search time

  const API_KEY = '2e85719828517999c1ce073d01087421'; // Replace with your API key
  const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

  const fetchWeather = async () => {
    if (!location) {
      setError('Please enter a location.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(API_URL, {
        params: {
          q: location,
          appid: API_KEY,
          units: 'metric', // Use Celsius
        },
      });

      setWeatherData(response.data);
      setSearchTime(new Date()); // Set the current search time
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data. Please check the location and try again.');
      setLoading(false);
      setWeatherData(null); // Clear previous weather data on error
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  // Function to get the appropriate weather icon
  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return <FontAwesomeIcon icon={faSun} className="weather-icon sun" />;
      case 'Clouds':
        return <FontAwesomeIcon icon={faCloud} className="weather-icon cloud" />;
      case 'Rain':
        return <FontAwesomeIcon icon={faCloudRain} className="weather-icon rain" />;
      case 'Snow':
        return <FontAwesomeIcon icon={faSnowflake} className="weather-icon snow" />;
      case 'Thunderstorm':
        return <FontAwesomeIcon icon={faBolt} className="weather-icon thunderstorm" />;
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Fog':
        return <FontAwesomeIcon icon={faSmog} className="weather-icon fog" />;
      default:
        return <FontAwesomeIcon icon={faSun} className="weather-icon sun" />;
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather Tracker</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter location (e.g., London)"
          value={location}
          onChange={handleLocationChange}
          disabled={loading} // Disable input while loading
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Fetching...' : 'Get Weather'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {loading && <div className="loading">Loading...</div>}

      {weatherData && (
        <div className="weather-details">
          <h2>
            Current Weather in {weatherData.city.name}, {weatherData.city.country}
          </h2>
          <div className="current-weather">
            {/* Display the current search time */}
            <p>Search Time: {searchTime.toLocaleTimeString()}</p>
            <p>Temperature: {weatherData.list[0].main.temp}°C</p>
            <p>Humidity: {weatherData.list[0].main.humidity}%</p>
            <p>Wind Speed: {weatherData.list[0].wind.speed} m/s</p>
            <p>Weather: {weatherData.list[0].weather[0].description}</p>
            {/* Weather Icon */}
            <div className="icon-container">
              {getWeatherIcon(weatherData.list[0].weather[0].main)}
            </div>
          </div>

          <h3>5-Day Forecast</h3>
          <div className="forecast">
            {weatherData.list
              .filter((reading, index) => index % 8 === 0) // Get one reading per day
              .map((day, index) => (
                <div key={index} className="forecast-day">
                  <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                  <p>Temp: {day.main.temp}°C</p>
                  <p>Humidity: {day.main.humidity}%</p>
                  <p>Wind: {day.wind.speed} m/s</p>
                  <p>{day.weather[0].description}</p>
                  {/* Weather Icon */}
                  <div className="icon-container">
                    {getWeatherIcon(day.weather[0].main)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;