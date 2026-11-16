import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE = 'https://api.open-meteo.com/v1/forecast';
const CACHE_KEY = 'staynest:lastWeather';

// ADSSU Bunawan area
export async function fetchWeather(lat = 8.1692, lon = 126.0044) {
  const url = `${BASE}?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,weather_code`;

  // Stop waiting after 10 seconds
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);

  try {
    console.log('Fetching weather...');
    const res = await fetch(url, { signal: controller.signal });
    console.log('Weather status:', res.status);
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    const data = await res.json();

    await AsyncStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: data.current, savedAt: new Date().toISOString() })
    );
    console.log('Weather saved');
    return data.current;
  } finally {
    clearTimeout(timer);
  }
}

export async function loadCachedWeather() {
  const raw = await AsyncStorage.getItem(CACHE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function describeWeather(code) {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Partly cloudy';
  if (code === 45 || code === 48) return 'Foggy';
  if (code >= 51 && code <= 57) return 'Drizzle';
  if (code >= 61 && code <= 67) return 'Rain';
  if (code >= 80 && code <= 82) return 'Rain showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Cloudy';
}