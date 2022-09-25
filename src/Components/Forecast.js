import rainDrop from '../img/water-drops.png';
import { getDay } from '../utils/getDay';
import { getRainPerDay, maxMinTemperature } from '../utils/parseWeather';

// import DaySpecific from './DaySpecific';

const iconURL = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

function Forecast({ forecastWeather }) {
  const indexOfMidnight = forecastWeather.list.findIndex((item) => {
    return item.dt_txt.includes('00:00:00');
  });
  const weatherWithoutToday = forecastWeather.list.slice(indexOfMidnight);
  const days = [];
  days.push(weatherWithoutToday.slice(0, 8));
  days.push(weatherWithoutToday.slice(8, 16));
  days.push(weatherWithoutToday.slice(16, 24));
  days.push(weatherWithoutToday.slice(24, 32));
  days.push(weatherWithoutToday.slice(32, 40));

  const temperatures = (day) => {
    return maxMinTemperature(day);
  };
  const rain = (day) => {
    return getRainPerDay(day);
  };
  return (
    <div className="forecast">
      {days.map((day) => {
        if (day.length > 3) {
          return (
            <div key={`timestamp-${day[0].dt}`} className="forecast-day">
              <h4>{getDay(day[0].dt_txt)}</h4>
              <div className="forecast-icon">
                <img src={iconURL(day[4].weather[0].icon)} alt="Weather icon" />
              </div>
              <div className="forecast-temp">
                <h4>{temperatures(day).max} °C</h4>
                <p>{temperatures(day).min} °C</p>
              </div>
              <div className="forecast-rain">
                <img src={rainDrop} alt="Waterdrops icon" />
                <p>{rain(day).toFixed(2)} mm/day</p>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default Forecast;
