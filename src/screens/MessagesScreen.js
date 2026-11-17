import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { houses } from '../data/houses';
import { common, colors } from '../theme';

const KEY = 'staynest:landlordNotes';

export default function MessagesScreen({ navigation }) {
  const [notes, setNotes] = useState({});   // saved notes: { houseId: text }
  const [drafts, setDrafts] = useState({}); // text being typed
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState('');

  // READ: load the saved notes when the screen opens
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setNotes(JSON.parse(raw));
      } catch (e) {
        console.log('Load notes error:', e.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const persist = async (next) => {
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(next));
      setNotes(next);
      return true;
    } catch (e) {
      return false;
    }
  };

  // CREATE / UPDATE: save the note for one landlord
  const saveNote = async (id) => {
    const text = (drafts[id] ?? notes[id] ?? '').trim();
    if (!text) {
      setStatus('Type a note first');
      return;
    }
    const ok = await persist({ ...notes, [id]: text });
    setStatus(ok ? 'Note saved on this phone' : 'Could not save the note');
  };

  // DELETE: remove the note of one landlord
  const deleteNote = async (id) => {
    const next = { ...notes };
    delete next[id];
    const ok = await persist(next);
    setDrafts((d) => {
      const copy = { ...d };
      delete copy[id];
      return copy;
    });
    setStatus(ok ? 'Note deleted' : 'Could not delete the note');
  };

  if (!loaded) {
    return (
      <View style={common.screen}>
        <Text style={common.muted}>Loading notes...</Text>
      </View>
    );
  }

  return (
    <View style={common.screen}>
      <Text style={common.title}>Landlord Inquiries</Text>
      <Text style={[common.muted, { marginBottom: 8 }]}>
        Open the chat, or write a note about a landlord.
      </Text>
      {status !== '' && <Text style={[common.muted, { marginBottom: 8 }]}>{status}</Text>}

      <FlatList
        data={houses}
        keyExtractor={(h) => h.id}
        renderItem={({ item }) => (
          <View style={common.card}>
            <TouchableOpacity onPress={() => navigation.navigate('Chat', { house: item })}>
              <Text style={common.cardTitle}>{item.landlord}</Text>
              <Text style={common.muted}>{item.name} · tap to open chat</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="Note (e.g. asked about deposit)"
              value={drafts[item.id] ?? notes[item.id] ?? ''}
              onChangeText={(text) => setDrafts((d) => ({ ...d, [item.id]: text }))}
              style={{
                backgroundColor: colors.bg,
                padding: 10,
                borderRadius: 8,
                marginTop: 10,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            />

            <TouchableOpacity style={common.button} onPress={() => saveNote(item.id)}>
              <Text style={common.buttonText}>Save note</Text>
            </TouchableOpacity>

            {notes[item.id] !== undefined && (
              <TouchableOpacity style={common.buttonOutline} onPress={() => deleteNote(item.id)}>
                <Text style={common.buttonOutlineText}>Delete note</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}