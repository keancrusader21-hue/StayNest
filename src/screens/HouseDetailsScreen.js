import { View, Text, Button } from 'react-native';

export default function HouseDetailsScreen({ route, navigation }) {
  const { house } = route.params;
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{house.name}</Text>
      <Text>₱{house.price}/month</Text>
      <Text>{house.walk} to ADSSU gate</Text>
      <Text>Landlord: {house.landlord}</Text>
      <Button title="Chat Owner" onPress={() => navigation.navigate('Chat', { house })} />
    </View>
  );
}