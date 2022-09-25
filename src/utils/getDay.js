export function getDay(date) {
  const day = new Date(date);
  const options = { weekday: 'short', month: 'numeric' };
  const string = day.toDateString(options);
  return string.slice(0, string.length - 5);
}
