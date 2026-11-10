import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from '../screens/ExploreScreen';
import CampusMapScreen from '../screens/CampusMapScreen';
import SavedScreen from '../screens/SavedScreen';
import MessagesScreen from '../screens/MessagesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import HouseDetailsScreen from '../screens/HouseDetailsScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ title: 'Explore Houses' }} />
      <Tab.Screen name="Map" component={CampusMapScreen} options={{ title: 'Campus Map' }} />
      <Tab.Screen name="Saved" component={SavedScreen} options={{ title: 'Saved' }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ title: 'Messages' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Sign In' }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="HouseDetails" component={HouseDetailsScreen} options={{ title: 'House Details' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat Owner' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}