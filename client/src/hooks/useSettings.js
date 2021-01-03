import { useContext } from 'react';
import SettingsContext from '../context/Settings';
import { saveSettingsToStorage } from '../lib/settings';

function useSettings() {
  const { settings, setSettings } = useContext(SettingsContext);

  const changeSettings = (newSettings) => {
    setSettings(newSettings);
    saveSettingsToStorage(newSettings);
  };

  return { settings, changeSettings };
}

export default useSettings;
