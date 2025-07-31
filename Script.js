const apiKey = '40b2e27c41beba54baaf70cacd50acb6';  // ✅ Your real key
const zip = '40047';  // 📍 Mount Washington, KY

async function getWeatherData() {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&units=imperial&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return {
      temp: data.main.temp,
      feels: data.main.feels_like,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      weather: data.weather[0].main.toLowerCase(),
      description: data.weather[0].description,
      uv: 8 // Static UV for now
    };
  } catch (err) {
    console.error("API fetch error:", err);
    return null;
  }
}

async function switchMode(mode) {
  const w = await getWeatherData();
  if (!w) {
    document.getElementById('output').textContent = "⚠️ Weather data unavailable.";
    return;
  }

  let msg = `📡 ${w.description}, ${w.temp}°F, Humidity: ${w.humidity}%, Wind: ${w.wind} mph\n`;

  if (mode === 'swim') {
    msg += "🏊 Swim Mode:\n";
    msg += (w.temp > 80 && w.wind < 10) ? "✅ Great swim weather.\n" : "🔻 Meh—maybe not ideal.\n";
    if (w.uv >= 8) msg += "☀️ Sunburn risk—grab SPF.\n";
  }

  else if (mode === 'repair') {
    msg += "🛠️ Repair Mode:\n";
    msg += (w.humidity > 60 || w.wind > 12)
      ? "⚠️ High humidity/wind—solder with caution.\n"
      : "✅ Looks good for electronics.\n";
  }

  else if (mode === 'dress') {
    msg += "🧥 Dress & Drama:\n";
    if (w.temp < 50) msg += "🧊 Bundle up.\n";
    if (w.temp > 85) msg += "🔥 Hot—dress light.\n";
    if (w.weather.includes("rain")) msg += "🌧️ Soggy Socks Alert!\n";
    if (w.humidity > 70 && w.wind > 10) msg += "💨 Frizz Incoming: Bad hair day.\n";
  }

  document.getElementById('output').textContent = msg;
}

function playNWS() {
  window.open('https://noaaweatherradio.org/live', '_blank');
}

function showRadar() {
  window.open(`https://radar.weather.gov/?zone=${zip}`, '_blank');
}
