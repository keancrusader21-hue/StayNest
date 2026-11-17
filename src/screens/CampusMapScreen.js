import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { houses } from '../data/houses';
import { common, colors } from '../theme';

const KEY = 'staynest:mapSort';
const minutes = (walk) => parseInt(walk, 10);

export default function CampusMapScreen({ navigation }) {
  const [nearestFirst, setNearestFirst] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState('');

  // READ: load the saved sort choice when the screen opens
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw !== null) setNearestFirst(JSON.parse(raw));
      } catch (e) {
        console.log('Load sort error:', e.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // CREATE / UPDATE: save the new sort choice
  const toggleSort = async () => {
    const next = !nearestFirst;
    setNearestFirst(next);
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(next));
      setStatus('Sort choice saved on this phone');
    } catch (e) {
      setStatus('Could not save the sort choice');
    }
  };

  // DELETE: remove the saved choice and go back to the default
  const resetSort = async () => {
    try {
      await AsyncStorage.removeItem(KEY);
      setNearestFirst(true);
      setStatus('Sort choice reset to default');
    } catch (e) {
      setStatus('Could not reset the sort choice');
    }
  };

  if (!loaded) {
    return (
      <View style={common.screen}>
        <Text style={common.muted}>Loading...</Text>
      </View>
    );
  }

  const sorted = [...houses].sort((a, b) =>
    nearestFirst ? minutes(a.walk) - minutes(b.walk) : minutes(b.walk) - minutes(a.walk)
  );

  return (
    <View style={common.screen}>
      <View style={[common.card, { backgroundColor: colors.dark }]}>
        <Text style={[common.title, { color: '#fff' }]}>ADSSU Bunawan Campus Gate</Text>
        <Text style={{ color: '#d1fae5' }}>Boarding houses near campus</Text>
      </View>

      <TouchableOpacity style={common.buttonOutline} onPress={toggleSort}>
        <Text style={common.buttonOutlineText}>
          Sort: {nearestFirst ? 'Nearest first' : 'Farthest first'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={common.buttonOutline} onPress={resetSort}>
        <Text style={common.buttonOutlineText}>Reset sort choice</Text>
      </TouchableOpacity>

      {status !== '' && <Text style={[common.muted, { marginTop: 8 }]}>{status}</Text>}

      <FlatList
        style={{ marginTop: 12 }}
        data={sorted}
        keyExtractor={(h) => h.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={common.card}
            onPress={() => navigation.navigate('HouseDetails', { house: item })}
          >
            <Text style={common.cardTitle}>{item.name}</Text>
            <Text style={common.muted}>{item.walk} to campus gate · ₱{item.price}/month</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}