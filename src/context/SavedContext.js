import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedContext = createContext();
const STORAGE_KEY = 'staynest:savedHouses';

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

 
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setSaved(JSON.parse(raw));
      } catch (e) {
        console.log('Load saved error:', e.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);


  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(saved)).catch((e) =>
      console.log('Save error:', e.message)
    );
  }, [saved, loaded]);


  const toggleSave = (house) => {
    setSaved((prev) =>
      prev.some((h) => h.id === house.id)
        ? prev.filter((h) => h.id !== house.id)
        : [...prev, { ...house, note: '' }]
    );
  };


  const updateNote = (id, note) => {
    setSaved((prev) => prev.map((h) => (h.id === id ? { ...h, note } : h)));
  };


  const removeSaved = (id) => {
    setSaved((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <SavedContext.Provider value={{ saved, loaded, toggleSave, updateNote, removeSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export const useSaved = () => useContext(SavedContext);
