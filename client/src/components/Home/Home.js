import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useTimers } from '../../hooks/useTimers';
import { TimerState, TimerType } from '../../lib/timer';
import Timer from '../Timer/Timer';
import TimerPicker from '../TimerPicker/TimerPicker';

const useStyles = makeStyles((theme) => ({
  welcomeText: {
    marginTop: '1rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
}));

function Home() {
  const classes = useStyles();

  const { timers } = useTimers();
  const [timer, setTimer] = useState(TimerType.POMODORO);
  const [timerState, setTimerState] = useState(TimerState.STOPPED);
  const timerDuration = timers[timer];

  const handleTimerChange = (timer) => {
    setTimer(timer);
  };

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
  }, [handleTimerStateChange]);

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h5" className={classes.welcomeText}>
            Let's get to work, shall we?
          </Typography>
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
      <TimerPicker onChange={handleTimerChange} />
    </div>
  );
}

export default Home;
