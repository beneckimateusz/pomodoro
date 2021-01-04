import React, { useEffect, useMemo, useState } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import { getSettingsFromStorage } from '../../lib/settings';

const SettingsContext = React.createContext();

export function SettingsProvider({ children }) {
  const { currentUser } = useCurrentUser();
  const initialSettings = useMemo(() => getSettingsFromStorage(), []);
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    console.log('currentUser', currentUser);
    if (currentUser) {
      setSettings(currentUser.settings);
    } else {
      setSettings(initialSettings);
    }
  }, [currentUser, initialSettings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsContext;
