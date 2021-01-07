import { Button, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { millisecondsToClockFormat, TimerState } from '../../lib/timer';

// TODO: Add comments
function Timer({ duration, state, onStateChange }) {
  const [deadline, setDeadline] = useState(null);
  const [timeLeft, setTimeLeft] = useState(duration);
  const humanReadableTime = millisecondsToClockFormat(timeLeft);

  const handleStartTimer = useCallback(() => {
    setDeadline(Date.now() + timeLeft);
    onStateChange(TimerState.STARTED);
  }, [onStateChange, setDeadline, timeLeft]);

  const handleStopTimer = useCallback(() => {
    onStateChange(TimerState.STOPPED);
  }, [onStateChange]);

  const handleEndTimer = useCallback(() => {
    setTimeLeft(0);
    onStateChange(TimerState.ENDED);
  }, [onStateChange]);

  const handleResetTimer = useCallback(() => {
    handleStopTimer();
    setTimeLeft(duration);
  }, [duration, handleStopTimer]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (state !== TimerState.STARTED) return;

    const intervalId = setInterval(() => {
      const delta = deadline - Date.now();
      setTimeLeft(delta);

      if (delta < 1000) handleEndTimer();
    }, 250);

    return () => clearInterval(intervalId);
  }, [state, deadline, handleEndTimer]);

  useEffect(() => {
    if (state === TimerState.STARTED) {
      document.title = `(${humanReadableTime}) Pomodoro`;
    } else if (timeLeft === duration) {
      document.title = 'Pomodoro';
    }
  }, [state, timeLeft, humanReadableTime, duration]);

  useEffect(() => {
    const shortcutHandler = (e) => {
      if (e.altKey && e.code === 'KeyR') {
        handleResetTimer();
      } else if (e.code === 'Space' && state !== TimerState.ENDED) {
        state === TimerState.STARTED ? handleStopTimer() : handleStartTimer();
      }
    };

    window.addEventListener('keydown', shortcutHandler);

    return () => window.removeEventListener('keydown', shortcutHandler);
  }, [handleResetTimer, handleStopTimer, handleStartTimer, state]);

  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h1">{humanReadableTime}</Typography>
      </Grid>
      <Grid item container justify="center" spacing={2}>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            disabled={
              state === TimerState.ENDED || state === TimerState.STARTED
            }
            onClick={handleStartTimer}
          >
            Start
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            disabled={
              state === TimerState.ENDED || state === TimerState.STOPPED
            }
            onClick={handleStopTimer}
          >
            Stop
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            disabled={timeLeft === duration}
            onClick={handleResetTimer}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

Timer.propTypes = {
  duration: PropTypes.number.isRequired,
  state: PropTypes.oneOf(Object.values(TimerState)),
  onStateChange: PropTypes.func.isRequired,
};

export default Timer;
