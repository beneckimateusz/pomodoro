import { gql, useMutation } from '@apollo/client';
import { Grid, Hidden, makeStyles, Typography } from '@material-ui/core';
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
import KeyboardShortcutsCard from '../KeyboardShortcutsCard/KeyboardShortcutsCard';
import Timer from '../Timer/Timer';
import TimerPicker from '../TimerPicker/TimerPicker';

const SAVE_POMODORO = gql`
  mutation SavePomodoro($endDate: DateTime!, $duration: Int!) {
    createPomodoro(endDate: $endDate, duration: $duration) {
      id
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '85vh',
  },
}));

function Home() {
  const classes = useStyles();
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
  const timerDuration = timerDurationMin * 60 * 1000;

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

  useEffect(() => {
    if (timerState === TimerState.ENDED) {
      alert.play();

      if (settings.desktopAlerts) {
        const { title, body } = notificationText(timer);
        showBrowserNotification(title, body);
      }
    }
  }, [timerState, timer, alert, settings.desktopAlerts]);

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
        spacing={2}
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
        <Hidden smDown>
          <Grid item>
            <KeyboardShortcutsCard />
          </Grid>
        </Hidden>
      </Grid>
      <TimerPicker onChange={handleTimerChange} />
    </div>
  );
}

export default Home;
