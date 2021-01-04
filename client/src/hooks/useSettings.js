import { useCallback, useContext } from 'react';
import SettingsContext from '../context/Settings/Settings';

function useSettings() {
  const { settings, setSettings } = useContext(SettingsContext);

  const changeSettings = useCallback(
    (newSettings) => {
      setSettings(newSettings);
    },
    [setSettings]
  );

  return { settings, changeSettings };
}

export default useSettings;
