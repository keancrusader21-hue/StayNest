import { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { common, colors } from '../theme';

const RENT_OPTIONS = [1000, 1500, 2000, 3000];

export default function SettingsScreen({ navigation }) {
  const [maxRent, setMaxRent] = useState(1500);
  const [vacantAlerts, setVacantAlerts] = useState(true);
  const [replyAlerts, setReplyAlerts] = useState(true);

  return (
    <ScrollView style={common.screen}>
      <View style={common.card}>
        <Text style={common.title}>My Profile</Text>
        <Text style={common.text}>Kean Ide</Text>
        <Text style={common.muted}>BSIT – 3rd Year · ADSSU</Text>
      </View>

      <View style={common.card}>
        <Text style={common.cardTitle}>Maximum Monthly Rent</Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          {RENT_OPTIONS.map((amount) => (
            <TouchableOpacity
              key={amount}
              onPress={() => setMaxRent(amount)}
              style={{
                flex: 1,
                padding: 10,
                marginRight: 6,
                borderRadius: 8,
                backgroundColor: maxRent === amount ? colors.primary : colors.border,
              }}
            >
              <Text style={{ textAlign: 'center', color: maxRent === amount ? '#fff' : colors.text }}>
                ₱{amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={common.card}>
        <Text style={common.cardTitle}>Notifications</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          <Text style={common.text}>Vacant Room Alerts</Text>
          <Switch value={vacantAlerts} onValueChange={setVacantAlerts} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          <Text style={common.text}>Landlord Reply Alerts</Text>
          <Switch value={replyAlerts} onValueChange={setReplyAlerts} />
        </View>
      </View>

      <TouchableOpacity style={common.buttonOutline} onPress={() => navigation.navigate('Explore')}>
        <Text style={common.buttonOutlineText}>Back to Explore</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={common.button}
        onPress={() => navigation.getParent()?.replace('Login')}
      >
        <Text style={common.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}