import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import useSettings from '../../hooks/useSettings';
import {
  motivationText,
  notificationText,
  sessionTypeName,
  TimerState,
  TimerType,
} from '../../lib/timer';
import KeyboardShortcutsCard from '../KeyboardShortcutsCard/KeyboardShortcutsCard';
import Timer from '../Timer/Timer';
import TimerPicker from '../TimerPicker/TimerPicker';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '85vh',
  },
}));

function Home() {
  const classes = useStyles();

  const { settings } = useSettings();
  const [timer, setTimer] = useState(TimerType.POMODORO);
  const [timerState, setTimerState] = useState(TimerState.STOPPED);
  const timerDuration = settings.timers[timer];

  // TODO: Consider moving this somewhere else
  const showBrowserNotification = useCallback(
    (message) => {
      if (settings.desktopAlerts) {
        new Notification(message);
      }
    },
    [settings.desktopAlerts]
  );

  const handleTimerStateChange = useCallback((state) => {
    setTimerState(state);
  }, []);

  const handleTimerChange = useCallback(
    (timer) => {
      handleTimerStateChange(TimerState.STOPPED);
      setTimer(timer);
    },
    [handleTimerStateChange]
  );

  useEffect(() => {
    if (timerState === TimerState.ENDED) {
      const message = notificationText(timer);
      showBrowserNotification(message);
    }
  }, [timerState, timer, showBrowserNotification]);

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
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-evenly"
        className={classes.root}
      >
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
              <Timer
                duration={timerDuration}
                state={timerState}
                onStateChange={handleTimerStateChange}
              />
            </Grid>
          )}
        </Grid>
        <Grid item>
          <KeyboardShortcutsCard />
        </Grid>
      </Grid>
      <TimerPicker onChange={handleTimerChange} />
    </div>
  );
}

export default Home;
