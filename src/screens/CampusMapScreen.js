import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { houses } from '../data/houses';
import { common, colors } from '../theme';

const minutes = (walk) => parseInt(walk, 10);

export default function CampusMapScreen({ navigation }) {
  const [nearestFirst, setNearestFirst] = useState(true);

  const sorted = [...houses].sort((a, b) =>
    nearestFirst ? minutes(a.walk) - minutes(b.walk) : minutes(b.walk) - minutes(a.walk)
  );

  return (
    <View style={common.screen}>
      <View style={[common.card, { backgroundColor: colors.dark }]}>
        <Text style={[common.title, { color: '#fff' }]}>ADSSU Bunawan Campus Gate</Text>
        <Text style={{ color: '#d1fae5' }}>Boarding houses near campus</Text>
      </View>

      <TouchableOpacity
        style={common.buttonOutline}
        onPress={() => setNearestFirst(!nearestFirst)}
      >
        <Text style={common.buttonOutlineText}>
          Sort: {nearestFirst ? 'Nearest first' : 'Farthest first'}
        </Text>
      </TouchableOpacity>

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