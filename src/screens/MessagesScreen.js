import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { houses } from '../data/houses';
import { common } from '../theme';

export default function MessagesScreen({ navigation }) {
  return (
    <View style={common.screen}>
      <Text style={common.title}>Landlord Inquiries</Text>
      <Text style={[common.muted, { marginBottom: 12 }]}>
        Tap a landlord to open the chat.
      </Text>

      <FlatList
        data={houses}
        keyExtractor={(h) => h.id}
        ListEmptyComponent={<Text style={common.muted}>Wala pang conversations.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={common.card}
            onPress={() => navigation.navigate('Chat', { house: item })}
          >
            <Text style={common.cardTitle}>{item.landlord}</Text>
            <Text style={common.muted}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
