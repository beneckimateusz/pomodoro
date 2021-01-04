import { useCallback, useContext } from 'react';
import SettingsContext from '../context/Settings';
import { saveSettingsToStorage } from '../lib/settings';

function useSettings() {
  const { settings, setSettings } = useContext(SettingsContext);

  const changeSettings = useCallback(
    (newSettings) => {
      setSettings(newSettings);
      saveSettingsToStorage(newSettings);
    },
    [setSettings]
  );

  return { settings, changeSettings };
}

export default useSettings;
