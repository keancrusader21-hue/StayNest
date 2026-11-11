import { View, Text, TouchableOpacity } from 'react-native';
import { useSaved } from '../context/SavedContext';
import { common } from '../theme';

export default function HouseDetailsScreen({ route, navigation }) {
  const { house } = route.params;
  const { saved, toggleSave } = useSaved();
  const isSaved = saved.some((h) => h.id === house.id);

  return (
    <View style={common.screen}>
      <View style={common.card}>
        <Text style={common.title}>{house.name}</Text>
        <Text style={common.text}>₱{house.price}/month</Text>
        <Text style={common.text}>{house.walk} to ADSSU gate</Text>
        <Text style={common.muted}>Landlord: {house.landlord}</Text>
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