export const TimerType = {
  POMODORO: 'pomodoro',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
};

export const TimerState = {
  STARTED: 'started',
  STOPPED: 'stoped',
  ENDED: 'ended',
};

export const sessionTypeName = (timer) => {
  switch (timer) {
    case TimerType.POMODORO:
      return 'Pomodoro';
    case TimerType.SHORT_BREAK:
      return 'Short break';
    case TimerType.LONG_BREAK:
      return 'Long break';
    default:
      return null;
  }
};

export const motivationText = (timer, timerState) => {
  if (timer === TimerType.POMODORO) {
    return timerState === TimerState.STARTED
      ? 'Keep it up!'
      : "Let's get to work, shall we?";
  }

  return timer === TimerType.SHORT_BREAK
    ? 'Take it easy'
    : "Refill what you're sipping on and come back";
};

export const notificationText = (timer) => {
  return timer === TimerType.POMODORO
    ? 'Time is up! Get some rest'
    : 'Break is over. You can get back to work';
};
