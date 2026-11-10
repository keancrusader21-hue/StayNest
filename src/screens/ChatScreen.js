import { View, Text } from 'react-native';

export default function ChatScreen({ route }) {
  const { house } = route.params;
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Chat with {house.landlord}</Text>
      <Text>About: {house.name}</Text>
    </View>
  );
}