const defaultSettings = {
  timers: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  },
  desktopAlerts: false,
  darkTheme: false,
};

export const getSettingsFromStorage = () => {
  const settings = localStorage.getItem('settings');
  return settings ? JSON.parse(settings) : defaultSettings;
};

export const saveSettingsToStorage = (settings) => {
  localStorage.setItem('settings', JSON.stringify(settings));
};
