import { gql, useMutation } from '@apollo/client';
import { Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import alertSound from '../../assets/alert.mp3';
import useCurrentUser from '../../hooks/useCurrentUser';
import useSettings from '../../hooks/useSettings';
import {
  motivationText,
  notificationText,
  sessionTypeName,
  TimerState,
  TimerType,
} from '../../lib/timer';
import {
  bottomCenterSnackbarOptions,
  showBrowserNotification,
} from '../../lib/utils';
import Countdown from '../Countdown/Countdown';
import TimerTypePicker from '../TimerTypePicker/TimerTypePicker';

const SAVE_POMODORO = gql`
  mutation SavePomodoro($endDate: DateTime!, $duration: Int!) {
    createPomodoro(endDate: $endDate, duration: $duration) {
      id
    }
  }
`;

function Timer() {
  const alert = useMemo(() => new Audio(alertSound), []);
  const { enqueueSnackbar } = useSnackbar();

  const { settings } = useSettings();
  const { currentUser } = useCurrentUser();

  const [savePomodoro] = useMutation(SAVE_POMODORO, {
    onCompleted: () =>
      enqueueSnackbar('Session saved', bottomCenterSnackbarOptions('success')),
    onError: (err) => console.error(err),
  });

  const [timer, setTimer] = useState(TimerType.POMODORO);
  const [timerState, setTimerState] = useState(TimerState.STOPPED);
  const timerDurationMin = settings.timers[timer];
  const timerDurationMs = timerDurationMin * 60 * 1000;

  const handleTimerStateChange = useCallback((state) => {
    setTimerState(state);
  }, []);

  const handleTimerChange = useCallback(
    (newTimer) => {
      if (newTimer === timer) return;
      handleTimerStateChange(TimerState.STOPPED);
      setTimer(newTimer);
    },
    [timer, handleTimerStateChange]
  );

  /**
   * Handle pomodoro session persistence for a logged in user.
   */
  useEffect(() => {
    if (
      currentUser &&
      timer === TimerType.POMODORO &&
      timerState === TimerState.ENDED
    ) {
      savePomodoro({
        variables: {
          endDate: new Date().toISOString(),
          duration: timerDurationMin,
        },
      });
    }
  }, [currentUser, timer, timerDurationMin, timerState, savePomodoro]);

  /**
   * Handle interval completion
   */
  useEffect(() => {
    if (timerState === TimerState.ENDED) {
      alert.play();

      if (settings.desktopAlerts) {
        const { title, body } = notificationText(timer);
        showBrowserNotification(title, body);
      }
    }
  }, [timerState, timer, alert, settings.desktopAlerts]);

  /**
   * Handle shortcuts which change the timer type
   */
  useEffect(() => {
    const shortcutHandler = (e) => {
      if (e.altKey) {
        if (e.code === 'KeyP') {
          handleTimerChange(TimerType.POMODORO);
        } else if (e.code === 'KeyS') {
          handleTimerChange(TimerType.SHORT_BREAK);
        } else if (e.code === 'KeyL') {
          handleTimerChange(TimerType.LONG_BREAK);
        }
      }
    };

    window.addEventListener('keydown', shortcutHandler);

    return () => window.removeEventListener('keydown', shortcutHandler);
  }, [handleTimerChange]);

  return (
    <Grid container item direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h4">{sessionTypeName(timer)}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          {motivationText(timer, timerState)}
        </Typography>
      </Grid>
      {settings.timers && (
        <Grid item>
          <Countdown
            duration={timerDurationMs}
            state={timerState}
            onStateChange={handleTimerStateChange}
          />
        </Grid>
      )}
      <TimerTypePicker onChange={handleTimerChange} />
    </Grid>
  );
}

export default Timer;
