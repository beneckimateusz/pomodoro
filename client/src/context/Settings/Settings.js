import React, { useEffect, useState } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import { getSettingsFromStorage } from '../../lib/settings';

const SettingsContext = React.createContext();

export function SettingsProvider({ children }) {
  const { currentUser } = useCurrentUser();
  const initialSettings = getSettingsFromStorage();
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    if (currentUser) {
      setSettings(currentUser.settings);
    }
  }, [currentUser]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsContext;
