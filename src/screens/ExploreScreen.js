import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { houses } from '../data/houses';
import { common } from '../theme';

export default function ExploreScreen({ navigation }) {
  return (
    <View style={common.screen}>
      <FlatList
        data={houses}
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