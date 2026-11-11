import { View, Text } from 'react-native';
import { common } from '../theme';

export default function ChatScreen({ route }) {
  const { house } = route.params;
  return (
    <View style={common.screen}>
      <View style={common.card}>
        <Text style={common.title}>Chat with {house.landlord}</Text>
        <Text style={common.muted}>About: {house.name}</Text>
      </View>
    </View>
  );
}