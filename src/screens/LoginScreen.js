import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { common, colors } from '../theme';

const ROLES = ['Student', 'Landlord', 'Admin'];

export default function LoginScreen({ navigation }) {
  const [role, setRole] = useState('Student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputStyle = {
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  };

  return (
    <View style={[common.screen, { justifyContent: 'center' }]}>
      <Text style={[common.title, { fontSize: 28 }]}>StayNest</Text>
      <Text style={[common.muted, { marginBottom: 20 }]}>
        A Smarter Way to Find Boarding Houses
      </Text>

      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        {ROLES.map((r) => (
          <TouchableOpacity
            key={r}
            onPress={() => setRole(r)}
            style={{
              flex: 1,
              padding: 10,
              marginRight: 6,
              borderRadius: 8,
              backgroundColor: role === r ? colors.primary : colors.border,
            }}
          >
            <Text style={{ textAlign: 'center', color: role === r ? '#fff' : colors.text }}>
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="ADSSU email or Student ID"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={inputStyle}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={inputStyle}
      />

      <TouchableOpacity style={common.button} onPress={() => navigation.replace('Main')}>
        <Text style={common.buttonText}>Sign In as {role}</Text>
      </TouchableOpacity>
    </View>
  );
}