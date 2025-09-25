# Weather App

A beautiful, responsive weather application built with React that provides current weather information and 5-day forecasts for any city worldwide.

## Features

- 🌤️ **Current Weather**: Get real-time weather data for any city
- 📍 **Location-based Weather**: Use your current location to get local weather
- 📊 **5-Day Forecast**: View upcoming weather predictions
- 🔍 **City Search**: Search for weather in any city worldwide
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🎨 **Beautiful UI**: Modern, clean interface with weather-themed styling
- ⚡ **Fast Loading**: Optimized performance with loading states
- 🚫 **Error Handling**: Graceful error handling for invalid cities or network issues

## Setup Instructions

### 1. Get OpenWeatherMap API Key

1. Go to [OpenWeatherMap API](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to your dashboard and copy your API key
4. The free tier includes:
   - 1,000 API calls per day
   - Current weather data
   - 5-day weather forecast
   - Historical weather data

### 2. Configure API Key

1. Open `src/config/weatherConfig.js`
2. Replace `'your_api_key_here'` with your actual API key:

```javascript
export const WEATHER_CONFIG = {
  API_KEY: 'your_actual_api_key_here', // Replace with your OpenWeatherMap API key
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  DEFAULT_CITY: 'Delhi',
  UNITS: 'metric'
};
```

### 3. Run the Application

```bash
# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```

The weather app will be available at `http://localhost:5173`

## Usage

### Search for Weather
1. Enter a city name in the search box
2. Click "Search" or press Enter
3. View current weather and 5-day forecast

### Use Current Location
1. Click the "📍 Current Location" button
2. Allow location access when prompted
3. View weather for your current location

### Weather Information Displayed
- **Current Temperature** with "feels like" temperature
- **Weather Description** (sunny, cloudy, rainy, etc.)
- **Humidity** percentage
- **Wind Speed** in m/s
- **Atmospheric Pressure** in hPa
- **Visibility** in kilometers
- **Sunrise and Sunset** times
- **5-Day Forecast** with daily predictions

## File Structure

```
src/
├── Components/
│   ├── WeatherApp.jsx      # Main weather component
│   └── WeatherApp.css      # Weather app styles
├── config/
│   └── weatherConfig.js    # API configuration
└── App.jsx                 # Main app component
```

## Customization

### Change Default City
Edit `DEFAULT_CITY` in `src/config/weatherConfig.js`:

```javascript
export const WEATHER_CONFIG = {
  // ... other config
  DEFAULT_CITY: 'Mumbai', // Change to your preferred city
};
```

### Change Temperature Units
Edit `UNITS` in `src/config/weatherConfig.js`:

```javascript
export const WEATHER_CONFIG = {
  // ... other config
  UNITS: 'imperial' // 'metric' for Celsius, 'imperial' for Fahrenheit, 'standard' for Kelvin
};
```

### Styling
Modify `src/Components/WeatherApp.css` to customize the appearance:
- Colors and gradients
- Font sizes and families
- Layout and spacing
- Animations and transitions

## API Information

This app uses the OpenWeatherMap API:
- **Current Weather API**: `/weather` endpoint
- **5-Day Forecast API**: `/forecast` endpoint
- **Geolocation Support**: Latitude/longitude based weather

### API Limits (Free Tier)
- 1,000 calls per day
- 60 calls per minute
- Weather data updates every 10 minutes

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Troubleshooting

### "City not found" Error
- Check spelling of city name
- Try using city name with country code (e.g., "London,UK")
- Some small cities might not be in the database

### API Key Issues
- Ensure API key is correctly copied
- Check if API key is activated (can take a few minutes)
- Verify you haven't exceeded daily limits

### Location Access Denied
- Enable location services in your browser
- Check browser permissions for the website
- Try using HTTPS instead of HTTP

### Network Errors
- Check internet connection
- Verify API endpoints are accessible
- Check browser console for detailed error messages

## Contributing

Feel free to contribute to this project by:
1. Adding new features (weather maps, alerts, etc.)
2. Improving the UI/UX design
3. Adding more weather data points
4. Implementing offline functionality
5. Adding unit tests

## License

This project is open source and available under the MIT License.
