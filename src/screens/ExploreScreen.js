import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { houses } from '../data/houses';

export default function ExploreScreen({ navigation }) {
  return (
    <FlatList
      data={houses}
      keyExtractor={(h) => h.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ padding: 16, marginBottom: 12, backgroundColor: '#fff', borderRadius: 12 }}
          onPress={() => navigation.navigate('HouseDetails', { house: item })}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
          <Text>₱{item.price}/month · {item.walk}</Text>
        </TouchableOpacity>
      )}
    />
  );
}