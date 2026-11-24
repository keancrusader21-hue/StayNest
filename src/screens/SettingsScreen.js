import { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { common, colors } from '../theme';

const RENT_OPTIONS = [1000, 1500, 2000, 3000];
const KEY = 'staynest:settings';
const DEFAULTS = { maxRent: 1500, vacantAlerts: true, replyAlerts: true };

export default function SettingsScreen({ navigation }) {
  const [settings, setSettings] = useState(DEFAULTS);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState('');


  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
      } catch (e) {
        console.log('Load settings error:', e.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);


  const change = async (patch) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(next));
      setStatus('Saved on this phone');
    } catch (e) {
      setStatus('Could not save settings');
    }
  };


  const reset = async () => {
    try {
      await AsyncStorage.removeItem(KEY);
      setSettings(DEFAULTS);
      setStatus('Settings reset to default');
    } catch (e) {
      setStatus('Could not reset settings');
    }
  };

  if (!loaded) {
    return (
      <View style={common.screen}>
        <Text style={common.muted}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={common.screen}>
      <View style={common.card}>
        <Text style={common.title}>My Profile</Text>
        <Text style={common.text}>Kean Ide</Text>
        <Text style={common.muted}>BSIT – 3rd Year · ADSSU</Text>
      </View>

      <View style={common.card}>
        <Text style={common.cardTitle}>Maximum Monthly Rent</Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          {RENT_OPTIONS.map((amount) => (
            <TouchableOpacity
              key={amount}
              onPress={() => change({ maxRent: amount })}
              style={{
                flex: 1,
                padding: 10,
                marginRight: 6,
                borderRadius: 8,
                backgroundColor: settings.maxRent === amount ? colors.primary : colors.border,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: settings.maxRent === amount ? '#fff' : colors.text,
                }}
              >
                ₱{amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={common.card}>
        <Text style={common.cardTitle}>Notifications</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          <Text style={common.text}>Vacant Room Alerts</Text>
          <Switch
            value={settings.vacantAlerts}
            onValueChange={(v) => change({ vacantAlerts: v })}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          <Text style={common.text}>Landlord Reply Alerts</Text>
          <Switch
            value={settings.replyAlerts}
            onValueChange={(v) => change({ replyAlerts: v })}
          />
        </View>
      </View>

      {status !== '' && <Text style={[common.muted, { marginBottom: 8 }]}>{status}</Text>}

      <TouchableOpacity style={common.buttonOutline} onPress={reset}>
        <Text style={common.buttonOutlineText}>Reset settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={common.buttonOutline} onPress={() => navigation.navigate('Explore')}>
        <Text style={common.buttonOutlineText}>Back to Explore</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={common.button}
        onPress={() => navigation.getParent()?.replace('Login')}
      >
        <Text style={common.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}