import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useSaved } from '../context/SavedContext';
import { common, colors } from '../theme';

export default function SavedScreen({ navigation }) {
  const { saved, loaded, updateNote, removeSaved } = useSaved();

  if (!loaded) {
    return (
      <View style={common.screen}>
        <Text style={common.muted}>Loading saved houses...</Text>
      </View>
    );
  }

  return (
    <View style={common.screen}>
      <Text style={common.title}>Saved Boarding Houses ({saved.length})</Text>
      {saved.length === 0 && <Text style={common.muted}>Wala pang naka-save.</Text>}

      <FlatList
        data={saved}
        keyExtractor={(h) => h.id}
        renderItem={({ item }) => (
          <View style={common.card}>
            <TouchableOpacity
              onPress={() => navigation.navigate('HouseDetails', { house: item })}
            >
              <Text style={common.cardTitle}>{item.name}</Text>
              <Text style={common.muted}>₱{item.price}/month · {item.walk}</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="Add a note (e.g. ask about deposit)"
              value={item.note || ''}
              onChangeText={(text) => updateNote(item.id, text)}
              style={{
                backgroundColor: colors.bg,
                padding: 10,
                borderRadius: 8,
                marginTop: 10,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            />

            <TouchableOpacity style={common.buttonOutline} onPress={() => removeSaved(item.id)}>
              <Text style={common.buttonOutlineText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}