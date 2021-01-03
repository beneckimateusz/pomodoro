import { Button, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { TimerState } from '../../lib/timer';
import { millisecondsToClockFormat } from '../../lib/utils';

// TODO: Add comments
function Timer({ duration, state, onStateChange }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60 * 1000);

  const handleStartTimer = useCallback(() => {
    onStateChange(TimerState.STARTED);
  }, [onStateChange]);

  const handleStopTimer = useCallback(() => {
    onStateChange(TimerState.STOPPED);
  }, [onStateChange]);

  const handleResetTimer = useCallback(() => {
    handleStopTimer();
    setTimeLeft(duration * 60 * 1000);
  }, [duration, handleStopTimer]);

  useEffect(() => {
    handleStopTimer();
    setTimeLeft(duration * 60 * 1000);
  }, [duration, handleStopTimer]);

  useEffect(() => {
    if (state === TimerState.STOPPED) return;
    if (timeLeft === 0) {
      handleStopTimer();
      return;
    }

    const intervalId = setTimeout(() => {
      setTimeLeft(timeLeft - 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [state, timeLeft, handleStopTimer]);

  useEffect(() => {
    const shortcutHandler = (e) => {
      if (e.altKey && e.code === 'KeyR') {
        handleResetTimer();
      } else if (e.code === 'Space' && timeLeft !== 0) {
        state === TimerState.STARTED ? handleStopTimer() : handleStartTimer();
      }
    };

    window.addEventListener('keydown', shortcutHandler);

    return () => window.removeEventListener('keydown', shortcutHandler);
  }, [handleResetTimer, handleStopTimer, handleStartTimer, state, timeLeft]);

  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h1">
          {millisecondsToClockFormat(timeLeft)}
        </Typography>
      </Grid>
      <Grid item container justify="center" spacing={2}>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            disabled={timeLeft === 0 || state === TimerState.STARTED}
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
            disabled={state === TimerState.STOPPED}
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
