import './App.css';
import { useEffect, useState } from 'react';
import Current from './Components/Current';
import Forecast from './Components/Forecast';
import Later from './Components/Later';

function App() {
  const [location, setLocation] = useState('Vienna');
  const [coordinates, setCoordinates] = useState({
    lon: 16.373819,
    lat: 48.208174,
  });
  // Initialized both states with falsy values
  const [currentWeather, setCurrentWeather] = useState('');
  const [weatherForecast, setWeatherForecast] = useState('');
  const [displayedLocation, setDisplayedLocation] = useState(location);

  const getCoordinates = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_MAP_URL}${process.env.REACT_APP_MAP_API_KEY}&q=${location}&format=json`,
    );
    const data = await response.json();
    setCoordinates({ lat: data[0].lat, lon: data[0].lon });
  };

  async function getCurrentWeather(coor) {
    const response = await fetch(
      `${process.env.REACT_APP_WEATHER_URL}/weather?lat=${coor.lat}&lon=${coor.lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
    );
    const data = await response.json();
    setCurrentWeather(data);
  }

  async function getWeatherForecast(coor) {
    const response = await fetch(
      `${process.env.REACT_APP_WEATHER_URL}/forecast?lat=${coor.lat}&lon=${coor.lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
    );
    const data = await response.json();
    setWeatherForecast(data);
  }

  useEffect(() => {
    getCurrentWeather(coordinates).catch((err) => console.log(err));
  }, [coordinates]);

  useEffect(() => {
    getWeatherForecast(coordinates).catch((err) => console.log(err));
  }, [coordinates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getCoordinates().catch((err) => console.log(err));
    setDisplayedLocation(location);
  };

  return (
    <div className="App">
      <div className="top">
        {currentWeather && (
          <Current weather={currentWeather} className="current-component" />
        )}
        <div className="middle">
          <h2>Weather forecast for {displayedLocation}</h2>
          <br />
          <div style={{ color: '#ddd' }}>
            <h4>Coordinates</h4>
            <p>{coordinates.lon}</p>
            <p>{coordinates.lat}</p>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <input
              id="location"
              value={location}
              onClick={() => setLocation('')}
              onChange={(e) => setLocation(e.currentTarget.value)}
            />
            <button>Search</button>
          </form>
        </div>
        {weatherForecast && (
          <Later
            forecastWeather={weatherForecast}
            className="later-component"
          />
        )}
      </div>
      <div className="bottom">
        {weatherForecast && (
          <Forecast
            forecastWeather={weatherForecast}
            className="forecast-component"
          />
        )}
      </div>
    </div>
  );
}

export default App;
