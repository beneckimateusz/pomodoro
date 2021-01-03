import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import { useCallback, useEffect, useState } from 'react';
import { useTimers } from '../../hooks/useTimers';
import { TimerState, TimerType } from '../../lib/timer';
import Timer from '../Timer/Timer';
import TimerPicker from '../TimerPicker/TimerPicker';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '85vh',
  },
}));

function Home() {
  const classes = useStyles();

  const { timers } = useTimers();
  const [timer, setTimer] = useState(TimerType.POMODORO);
  const [timerState, setTimerState] = useState(TimerState.STOPPED);
  const timerDuration = timers[timer];

  const handleTimerChange = useCallback((timer) => {
    setTimer(timer);
  }, []);

  const handleTimerStateChange = useCallback((state) => {
    setTimerState(state);
  }, []);

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

  const sessionTypeName = () => {
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

  const motivationText = () => {
    if (timer === TimerType.POMODORO) {
      return timerState === TimerState.STOPPED
        ? "Let's get to work, shall we?"
        : 'Keep it up!';
    }

    return timer === TimerType.SHORT_BREAK
      ? 'Take it easy'
      : "Refill what you're sipping on and come back";
  };

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
            <Typography variant="h4">{sessionTypeName()}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">{motivationText()}</Typography>
          </Grid>
          {timers && (
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
          <Card>
            <CardHeader
              avatar={
                <Avatar>
                  <KeyboardIcon />
                </Avatar>
              }
              title="Keyboard shortcuts"
              subheader="Simplify your workflow"
            />
            <CardContent>
              <div>
                <strong>SPACE</strong> - Toggle timer
              </div>
              <div>
                <strong>ALT+P</strong> - Pomodoro
              </div>
              <div>
                <strong>ALT+S</strong> - Short break
              </div>
              <div>
                <strong>ALT+L</strong> - Long break
              </div>
              <div>
                <strong>ALT+R</strong> - Reset
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <TimerPicker onChange={handleTimerChange} />
    </div>
  );
}

export default Home;
