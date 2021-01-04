import { Button, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { TimerState } from '../../lib/timer';
import { millisecondsToClockFormat } from '../../lib/utils';

// TODO: Add comments
function Timer({ duration, state, onStateChange }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60 * 1000);
  const humanReadableTime = millisecondsToClockFormat(timeLeft);

  const handleStartTimer = useCallback(() => {
    onStateChange(TimerState.STARTED);
  }, [onStateChange]);

  const handleStopTimer = useCallback(() => {
    onStateChange(TimerState.STOPPED);
  }, [onStateChange]);

  const handleEndTimer = useCallback(() => {
    onStateChange(TimerState.ENDED);
  }, [onStateChange]);

  const handleResetTimer = useCallback(() => {
    handleStopTimer();
    setTimeLeft(duration * 60 * 1000);
  }, [duration, handleStopTimer]);

  useEffect(() => {
    setTimeLeft(duration * 60 * 1000);
  }, [duration]);

  // TODO: rewrite using dates
  useEffect(() => {
    if (state !== TimerState.STARTED) return;
    if (timeLeft === 0) {
      handleEndTimer();
      return;
    }

    const timeoutId = setTimeout(() => {
      setTimeLeft(timeLeft - 1000);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [state, timeLeft, handleEndTimer]);

  useEffect(() => {
    if (state === TimerState.STARTED || state === TimerState.ENDED) {
      document.title = `(${humanReadableTime}) Pomodoro`;
    } else if (timeLeft === duration * 60 * 1000) {
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
