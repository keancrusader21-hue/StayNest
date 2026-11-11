import { createContext, useContext, useState } from 'react';

const SavedContext = createContext();

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState([]);

  const toggleSave = (house) => {
    setSaved((prev) =>
      prev.some((h) => h.id === house.id)
        ? prev.filter((h) => h.id !== house.id)
        : [...prev, house]
    );
  };

  return (
    <SavedContext.Provider value={{ saved, toggleSave }}>
      {children}
    </SavedContext.Provider>
  );
}

export const useSaved = () => useContext(SavedContext);