export default function (value) {
  const date = new Date(null);
  date.setSeconds(value / 1000);
  const utc = date.toUTCString();
  return utc.substr(utc.indexOf(':') + 1, 5);
}