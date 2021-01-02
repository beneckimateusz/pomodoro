import React, { useContext, useState } from 'react';
import { getSettingsFromStorage, saveSettingsToStorage } from '../lib/settings';

const SettingsContext = React.createContext();

export function useTimers() {
  const { settings, setSettings } = useContext(SettingsContext);

  const setTimers = (timers) => {
    const newSettings = { ...settings, timers };
    setSettings(newSettings);
    saveSettingsToStorage(newSettings);
  };

  return { timers: settings.timers, setTimers };
}

export function SettingsProvider({ children }) {
  const initialSettings = getSettingsFromStorage();
  const [settings, setSettings] = useState(initialSettings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
