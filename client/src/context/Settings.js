import React, { useState } from 'react';
import { getSettingsFromStorage } from '../lib/settings';

const SettingsContext = React.createContext();

export function SettingsProvider({ children }) {
  const initialSettings = getSettingsFromStorage();
  const [settings, setSettings] = useState(initialSettings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsContext;
