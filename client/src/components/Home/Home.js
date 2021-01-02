import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useTimers } from '../../hooks/useTimers';
import { TimerTypes } from '../../lib/timers';
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
  const [timer, setTimer] = useState(TimerTypes.POMODORO);
  const timerDuration = timers[timer];

  const handleTimerChange = (timer) => {
    setTimer(timer);
  };

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
            <Timer duration={timerDuration} />
          </Grid>
        )}
      </Grid>
      <TimerPicker onChange={handleTimerChange} />
    </div>
  );
}

export default Home;
