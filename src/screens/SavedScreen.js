import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSaved } from '../context/SavedContext';
import { common } from '../theme';

export default function SavedScreen({ navigation }) {
  const { saved } = useSaved();

  return (
    <View style={common.screen}>
      <Text style={common.title}>Saved Boarding Houses ({saved.length})</Text>
      {saved.length === 0 && <Text style={common.muted}></Text>}
      <FlatList
        data={saved}
        keyExtractor={(h) => h.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={common.card}
            onPress={() => navigation.navigate('HouseDetails', { house: item })}
          >
            <Text style={common.cardTitle}>{item.name}</Text>
            <Text style={common.muted}>₱{item.price}/month · {item.walk}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}