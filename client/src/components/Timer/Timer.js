import { Button, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { millisecondsToClockFormat } from '../../lib/utils';

function Timer({ duration }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60 * 1000);
  const [timerStopped, setTimerStopped] = useState(true);

  useEffect(() => {
    setTimerStopped(true);
    setTimeLeft(duration * 60 * 1000);
  }, [duration]);

  useEffect(() => {
    if (timerStopped || timeLeft === 0) return;

    const intervalId = setTimeout(() => {
      setTimeLeft(timeLeft - 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerStopped, timeLeft]);

  const handleStartTimer = () => {
    setTimerStopped(false);
  };

  const handleStopTimer = () => {
    setTimerStopped(true);
  };

  const handleResetTimer = () => {
    handleStopTimer();
    setTimeLeft(duration * 60 * 1000);
  };

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
            disabled={!timerStopped}
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
            disabled={timerStopped}
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
};

export default Timer;
