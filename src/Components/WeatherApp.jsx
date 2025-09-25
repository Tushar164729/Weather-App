import { useState, useEffect, useCallback } from "react";
import "./WeatherApp.css";
import { WEATHER_CONFIG } from "../config/weatherConfig";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [currentCity, setCurrentCity] = useState(WEATHER_CONFIG.DEFAULT_CITY);

  // OpenWeatherMap API configuration
  const API_KEY = WEATHER_CONFIG.API_KEY;
  const BASE_URL = WEATHER_CONFIG.BASE_URL;

  // Fetch weather data for a city
  const fetchWeatherData = useCallback(
    async (cityName) => {
      setLoading(true);
      setError(null);

      try {
        // Fetch current weather
        const weatherResponse = await fetch(
          `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        );

        if (!weatherResponse.ok) {
          throw new Error("City not found");
        }

        const weather = await weatherResponse.json();
        setWeatherData(weather);
        setCurrentCity(weather.name);

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
          `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
        );

        if (forecastResponse.ok) {
          const forecast = await forecastResponse.json();
          setForecastData(forecast);
        }
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
        setForecastData(null);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY, BASE_URL]
  );

  // Get user's current location weather
  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLoading(true);

          try {
            const response = await fetch(
              `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );

            if (response.ok) {
              const weather = await response.json();
              setWeatherData(weather);
              setCurrentCity(weather.name);

              // Also fetch forecast for current location
              const forecastResponse = await fetch(
                `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
              );

              if (forecastResponse.ok) {
                const forecast = await forecastResponse.json();
                setForecastData(forecast);
              }
            }
          } catch (err) {
            setError(err.message || "Failed to get weather for your location");
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError("Location access denied");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city.trim());
      setCity("");
    }
  };

  // Load default city weather on component mount
  useEffect(() => {
    fetchWeatherData(currentCity);
  }, [currentCity, fetchWeatherData]);

  // Get weather icon URL
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="weather-app">
      <div className="weather-container">
        <header className="weather-header">
          <h1>Weather App</h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="search-input"
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>

          {/* Current Location Button */}
          <button
            onClick={getCurrentLocationWeather}
            className="location-btn"
            disabled={loading}
          >
            📍 Current Location
          </button>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error">
            <p>❌ {error}</p>
          </div>
        )}

        {/* Weather Data Display */}
        {weatherData && !loading && (
          <div className="weather-content">
            {/* Current Weather */}
            <div className="current-weather">
              <div className="current-weather-main">
                <div className="weather-info">
                  <h2>
                    {weatherData.name}, {weatherData.sys.country}
                  </h2>
                  <p className="date">{formatDate(weatherData.dt)}</p>
                  <div className="temperature">
                    <span className="temp-main">
                      {Math.round(weatherData.main.temp)}°C
                    </span>
                    <div className="temp-details">
                      <p>
                        Feels like {Math.round(weatherData.main.feels_like)}°C
                      </p>
                      <p>{weatherData.weather[0].description}</p>
                    </div>
                  </div>
                </div>
                <div className="weather-icon">
                  <img
                    src={getWeatherIconUrl(weatherData.weather[0].icon)}
                    alt={weatherData.weather[0].description}
                  />
                </div>
              </div>

              {/* Weather Details */}
              <div className="weather-details">
                <div className="detail-item">
                  <span className="label">Humidity</span>
                  <span className="value">{weatherData.main.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="label">Wind Speed</span>
                  <span className="value">{weatherData.wind.speed} m/s</span>
                </div>
                <div className="detail-item">
                  <span className="label">Pressure</span>
                  <span className="value">{weatherData.main.pressure} hPa</span>
                </div>
                <div className="detail-item">
                  <span className="label">Visibility</span>
                  <span className="value">
                    {(weatherData.visibility / 1000).toFixed(1)} km
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">Sunrise</span>
                  <span className="value">
                    {formatTime(weatherData.sys.sunrise)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">Sunset</span>
                  <span className="value">
                    {formatTime(weatherData.sys.sunset)}
                  </span>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            {forecastData && (
              <div className="forecast">
                <h3>5-Day Forecast</h3>
                <div className="forecast-list">
                  {forecastData.list
                    .filter((_, index) => index % 8 === 0) // Get one forecast per day
                    .slice(0, 5)
                    .map((item, index) => (
                      <div key={index} className="forecast-item">
                        <p className="forecast-date">
                          {new Date(item.dt * 1000).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <img
                          src={getWeatherIconUrl(item.weather[0].icon)}
                          alt={item.weather[0].description}
                          className="forecast-icon"
                        />
                        <p className="forecast-temp">
                          {Math.round(item.main.temp)}°C
                        </p>
                        <p className="forecast-desc">
                          {item.weather[0].description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
