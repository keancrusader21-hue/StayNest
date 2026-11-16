import { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSaved } from '../context/SavedContext';
import { fetchWeather, loadCachedWeather, describeWeather } from '../api/weather';
import { common, colors } from '../theme';

export default function HouseDetailsScreen({ route, navigation }) {
  const { house } = route.params;
  const { saved, toggleSave } = useSaved();
  const isSaved = saved.some((h) => h.id === house.id);

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cachedAt, setCachedAt] = useState(null);

  const loadWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setWeather(await fetchWeather());
      setCachedAt(null);
    } catch (e) {
      const cached = await loadCachedWeather();
      if (cached) {
        setWeather(cached.data);
        setCachedAt(cached.savedAt);
        setError('Offline. Showing the last saved weather.');
      } else {
        setWeather(null);
        setError('Cannot load weather. Check your internet and try again.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  return (
    <View style={common.screen}>
      <View style={common.card}>
        <Text style={common.title}>{house.name}</Text>
        <Text style={common.text}>₱{house.price}/month</Text>
        <Text style={common.text}>{house.walk} to ADSSU gate</Text>
        <Text style={common.muted}>Landlord: {house.landlord}</Text>
      </View>

      <View style={common.card}>
        <Text style={common.cardTitle}>Weather near the boarding house</Text>
        {loading && <ActivityIndicator style={{ marginTop: 8 }} color={colors.primary} />}
        {error && <Text style={{ color: '#b91c1c', marginTop: 8 }}>{error}</Text>}
        {weather && !loading && (
          <View style={{ marginTop: 8 }}>
            <Text style={common.text}>
              {weather.temperature_2m}°C · {describeWeather(weather.weather_code)}
            </Text>
            <Text style={common.muted}>Rain now: {weather.precipitation} mm</Text>
            {cachedAt && (
              <Text style={common.muted}>
                Last updated: {new Date(cachedAt).toLocaleString()}
              </Text>
            )}
          </View>
        )}
        <TouchableOpacity style={common.buttonOutline} onPress={loadWeather}>
          <Text style={common.buttonOutlineText}>Refresh weather</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={common.buttonOutline} onPress={() => toggleSave(house)}>
        <Text style={common.buttonOutlineText}>{isSaved ? 'Remove from Saved' : 'Save'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={common.button} onPress={() => navigation.navigate('Chat', { house })}>
        <Text style={common.buttonText}>Chat Owner</Text>
      </TouchableOpacity>
    </View>
  );
}