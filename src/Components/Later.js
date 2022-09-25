function Later({ forecastWeather }) {
  const apprIndex = forecastWeather.list.findIndex((item) => {
    if (item.dt_txt.includes('21:00:00') <= 4) {
      return item.dt_txt.includes('21:00:00');
    } else {
      return item.dt_txt.includes('12:00:00');
    }
  });
  const weatherInFewHours = forecastWeather.list[apprIndex];
  const iconURL = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

  return (
    <div className="current-container">
      <h3>In a few hours</h3>
      <h4>{weatherInFewHours.weather[0].description}</h4>
      <div className="current-temp">
        <img
          src={iconURL(weatherInFewHours.weather[0].icon)}
          alt="Weather icon"
        />
        <div className="temp">
          <h5>{Math.round(weatherInFewHours.main.temp)} °C</h5>
          <hr />
          <p>
            feels like{' '}
            <strong>{Math.round(weatherInFewHours.main.feels_like)} °C</strong>
          </p>
        </div>
      </div>
      <div className="current-information">
        <div className="current-fluids">
          <p>
            Humidity: <strong>{weatherInFewHours.main.humidity}%</strong>
          </p>
          <p>
            Clouds: <strong>{weatherInFewHours.clouds.all}%</strong>
          </p>
          {weatherInFewHours.rain ? (
            <p>
              Rain: <strong>{weatherInFewHours.rain['3h']} mm </strong>
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="current-wind">
        <p>
          Windspeed: <strong>{weatherInFewHours.wind.speed} m/s</strong>
        </p>
      </div>
    </div>
  );
}
export default Later;
