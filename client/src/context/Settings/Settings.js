/**
 * Settings can come from either the local storage or backend,
 * regarding whether the user is logged in or not.
 */
import React, { useEffect, useMemo, useState } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import { getSettingsFromStorage } from '../../lib/settings';

const SettingsContext = React.createContext();

export function SettingsProvider({ children }) {
  const { currentUser } = useCurrentUser();
  const initialSettings = useMemo(() => getSettingsFromStorage(), []);
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
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
