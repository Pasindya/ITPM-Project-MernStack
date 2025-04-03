import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Weather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloud,
  faCloudRain,
  faSnowflake,
  faBolt,
  faSmog,
  faCloudSun,
  faWind,
  faSearchLocation,
  faHeart,
  faBookmark
} from '@fortawesome/free-solid-svg-icons';

function Weather() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTime, setSearchTime] = useState(null);
  const [backgroundClass, setBackgroundClass] = useState('default-bg');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const API_KEY = '2e85719828517999c1ce073d01087421';
  const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

  // Set background based on weather condition
  useEffect(() => {
    if (weatherData) {
      const weatherCondition = weatherData.list[0].weather[0].main;
      const backgroundMap = {
        Clear: 'sunny-bg',
        Clouds: 'cloudy-bg',
        Rain: 'rainy-bg',
        Drizzle: 'rainy-bg',
        Snow: 'snowy-bg',
        Thunderstorm: 'stormy-bg',
        Mist: 'foggy-bg',
        Smoke: 'foggy-bg',
        Haze: 'foggy-bg',
        Fog: 'foggy-bg',
      };
      setBackgroundClass(backgroundMap[weatherCondition] || 'default-bg');
    }
  }, [weatherData]);

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
          units: 'metric',
        },
      });

      setWeatherData(response.data);
      setSearchTime(new Date());
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data. Please check the location and try again.');
      setLoading(false);
      setWeatherData(null);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const addToFavorites = () => {
    if (weatherData && !favorites.includes(weatherData.city.name)) {
      setFavorites([...favorites, weatherData.city.name]);
    }
  };

  const removeFromFavorites = (city) => {
    setFavorites(favorites.filter(fav => fav !== city));
  };

  const loadFavorite = (city) => {
    setLocation(city);
    fetchWeather();
    setShowFavorites(false);
  };

  const getWeatherIcon = (weatherCondition) => {
    const iconMap = {
      Clear: <FontAwesomeIcon icon={faSun} className="weather-icon sun" />,
      Clouds: weatherData?.list[0]?.weather[0]?.description.includes('few clouds')
        ? <FontAwesomeIcon icon={faCloudSun} className="weather-icon cloud-sun" />
        : <FontAwesomeIcon icon={faCloud} className="weather-icon cloud" />,
      Rain: <FontAwesomeIcon icon={faCloudRain} className="weather-icon rain" />,
      Snow: <FontAwesomeIcon icon={faSnowflake} className="weather-icon snow" />,
      Thunderstorm: <FontAwesomeIcon icon={faBolt} className="weather-icon thunderstorm" />,
      Mist: <FontAwesomeIcon icon={faSmog} className="weather-icon fog" />,
      Smoke: <FontAwesomeIcon icon={faSmog} className="weather-icon fog" />,
      Haze: <FontAwesomeIcon icon={faSmog} className="weather-icon fog" />,
      Fog: <FontAwesomeIcon icon={faSmog} className="weather-icon fog" />,
      Wind: <FontAwesomeIcon icon={faWind} className="weather-icon wind" />,
    };
    return iconMap[weatherCondition] || <FontAwesomeIcon icon={faSun} className="weather-icon sun" />;
  };

  return (
    <div className={`weather-app ${backgroundClass}`}>
      <div className="weather-container">
        <header className="app-header">
          <h1>Weather Tracker</h1>
          <div className="header-controls">
            <button 
              onClick={() => setShowFavorites(!showFavorites)} 
              className="favorites-toggle"
            >
              <FontAwesomeIcon icon={faBookmark} /> {showFavorites ? 'Hide Favorites' : 'My Favorites'}
            </button>
          </div>
        </header>

        {showFavorites && (
          <div className="favorites-panel">
            <h3><FontAwesomeIcon icon={faBookmark} /> Saved Locations</h3>
            {favorites.length === 0 ? (
              <p className="no-favorites">No favorites added yet</p>
            ) : (
              <ul className="favorites-list">
                {favorites.map((city, index) => (
                  <li key={index} className="favorite-item">
                    <span onClick={() => loadFavorite(city)} className="favorite-city">{city}</span>
                    <button 
                      onClick={() => removeFromFavorites(city)} 
                      className="remove-favorite"
                      aria-label={`Remove ${city} from favorites`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-container">
            <FontAwesomeIcon icon={faSearchLocation} className="search-icon" />
            <input
              type="text"
              placeholder="Enter city name (e.g., London, Tokyo)"
              value={location}
              onChange={handleLocationChange}
              disabled={loading}
              className="search-input"
            />
            <button type="submit" disabled={loading} className="search-button">
              {loading ? (
                <span className="loading-text">Searching...</span>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSearchLocation} /> Search
                </>
              )}
            </button>
          </div>
          
          {weatherData && (
            <button 
              type="button" 
              onClick={addToFavorites} 
              className={`favorite-button ${favorites.includes(weatherData.city.name) ? 'saved' : ''}`}
              disabled={favorites.includes(weatherData.city.name)}
            >
              <FontAwesomeIcon icon={faHeart} /> 
              {favorites.includes(weatherData.city.name) ? 'Saved to Favorites' : 'Add to Favorites'}
            </button>
          )}
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {weatherData && (
          <div className="weather-dashboard">
            <div className="current-weather-card">
              <div className="location-info">
                <h2>
                  {weatherData.city.name}, {weatherData.city.country}
                </h2>
                <p className="search-time">
                  Last updated: {searchTime.toLocaleString()}
                </p>
              </div>

              <div className="weather-main">
                <div className="temperature-display">
                  <span className="temp-value">
                    {Math.round(weatherData.list[0].main.temp)}
                  </span>
                  <span className="temp-unit">°C</span>
                </div>
                <div className="weather-icon-large">
                  {getWeatherIcon(weatherData.list[0].weather[0].main)}
                </div>
              </div>

              <div className="weather-details">
                <p className="weather-description">
                  {weatherData.list[0].weather[0].description}
                </p>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Feels Like</span>
                    <span className="detail-value">
                      {Math.round(weatherData.list[0].main.feels_like)}°C
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Humidity</span>
                    <span className="detail-value">
                      {weatherData.list[0].main.humidity}%
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Wind</span>
                    <span className="detail-value">
                      {weatherData.list[0].wind.speed} m/s
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Pressure</span>
                    <span className="detail-value">
                      {weatherData.list[0].main.pressure} hPa
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="forecast-section">
              <h3>5-Day Forecast</h3>
              <div className="forecast-cards">
                {weatherData.list
                  .filter((reading, index) => index % 8 === 0)
                  .map((day, index) => (
                    <div key={index} className="forecast-card">
                      <p className="forecast-date">
                        {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      <div className="forecast-icon">
                        {getWeatherIcon(day.weather[0].main)}
                      </div>
                      <div className="forecast-temps">
                        <span className="temp-max">
                          {Math.round(day.main.temp_max)}°C
                        </span>
                        <span className="temp-min">
                          {Math.round(day.main.temp_min)}°C
                        </span>
                      </div>
                      <p className="forecast-desc">
                        {day.weather[0].description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;