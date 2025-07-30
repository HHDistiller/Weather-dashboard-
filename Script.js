const apiKey = '.40b2e27c41beba54baaf70cacd50acb6'; // Replace with your actual key
const zip = '40047'; // Mount Washington ZIP

async function getWeatherData() {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&units=imperial&appid=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return {
    temp: data.main.temp,
    feels: data.main.feels_like,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    weather: data.weather[0].main.toLowerCase(),
    description: data.weather[0].description,
    uv: 8 // Static UV index—can upgrade later with separate API
  };
}

async function switchMode(mode) {
  const w = await getWeatherData();
  let msg = `📡 Conditions: ${w.description}, ${w.temp}°F, Humidity: ${w.humidity}%, Wind: ${w.wind} mph\n`;

  if (mode === 'swim') {
    msg += "🏊 Swim Mode: ";
    if (w.temp > 80 && w.wind < 10) msg += "Great for swimming! Warm & calm.\n";
    else msg += "Meh… sprinkler may be the better bet.\n";
    if (w.uv >= 8) msg += "☀️ Sunburn danger high—bring SPF or crisp.\n";
  }

  else if (mode === 'repair') {
    msg += "🛠️ Repair Mode: ";
    if (w.humidity > 60 || w.wind > 12) {
      msg += "Caution—humidity or gusts could ruin your solder game.\n";
    } else {
      msg += "Conditions look solid for outdoor electronics.\n";
    }
  }

  else if (mode === 'dress') {
    msg += "🧥 Dress & Drama: ";
    if (w.temp < 50) msg += "Cold—layer up. Gloves optional, regrets not.\n";
    else if (w.temp > 85) msg += "Hot—go light or go sweaty.\n";
    if (w.weather.includes("rain")) msg += "🚨 Soggy Socks Alert—waterproof up.\n";
    if (w.humidity > 70 && w.wind > 10) msg += "💨 Bad Hair Day—chaos in the follicles.\n";
  }

  document.getElementById('output').textContent = msg;
}

function playNWS() {
  window.open('https://noaaweatherradio.org/live', '_blank');
}

function showRadar() {
  window.open(`https://radar.weather.gov/?zone=${zip}`, '_blank');
}
