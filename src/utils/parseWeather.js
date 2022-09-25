export function getRainPerDay(weather) {
  let result = 0;
  weather.map((timestamp) => {
    return timestamp.rain ? (result += timestamp.rain['3h']) : result;
  });
  return result;
}

export function maxMinTemperature(weather) {
  let maxTemp = -Infinity;
  let minTemp = Infinity;
  weather.map((timestamp) => {
    return timestamp.main.temp < minTemp
      ? (minTemp = timestamp.main.temp)
      : timestamp.main.temp > maxTemp && (maxTemp = timestamp.main.temp);
  });
  const temperatures = { max: Math.round(maxTemp), min: Math.round(minTemp) };
  return temperatures;
}
