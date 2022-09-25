const iconURL = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

function Current({ weather }) {
  const weatherDescription = weather.weather[0].description;
  const weatherIcon = weather.weather[0].icon;
  const temperature = weather.main.temp;
  const tempFeel = weather.main.feels_like;
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;
  const cloudCover = weather.clouds.all;
  return (
    <div className="current-container">
      <h3>Right now</h3>
      <h4>{weatherDescription}</h4>
      <div className="current-temp">
        <img src={iconURL(weatherIcon)} alt="Weather icon" />
        <div className="temp">
          <h5>{Math.round(temperature)} °C</h5>
          <hr />
          <p>
            feels like <strong>{Math.round(tempFeel)} °C</strong>
          </p>
        </div>
      </div>
      <div className="current-information">
        <div className="current-fluids">
          <p>
            Humidity: <strong>{humidity}%</strong>
          </p>
          <p>
            Clouds: <strong>{cloudCover}%</strong>
          </p>
          {weather.rain ? (
            <p>
              Rain: <strong>{weather.rain['3h']} mm </strong>
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="current-wind">
        <p>
          Windspeed: <strong>{wind} m/s </strong>
        </p>
      </div>
    </div>
  );
}

export default Current;
