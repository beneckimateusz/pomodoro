const defaultSettings = {
  timers: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  },
};

// export const timersInMinToMs = (timersInMin) => {
//   const timersInMs = {};
//   Object.keys(timersInMin).forEach(timer => timersInMs[timer] = timersInMin[timer] * 60 * 1000);
//   return timersInMs;
// };

export const getSettingsFromStorage = () => {
  const settings = localStorage.getItem('settings');
  return settings ? JSON.parse(settings) : defaultSettings;
};

export const saveSettingsToStorage = (settings) => {
  localStorage.setItem('settings', JSON.stringify(settings));
};
