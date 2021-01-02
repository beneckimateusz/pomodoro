import { Grid, makeStyles, Typography } from '@material-ui/core';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import TimerIcon from '@material-ui/icons/Timer';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { useTimers } from '../../hooks/useTimers';
import Timer from '../Timer/Timer';

const useStyles = makeStyles((theme) => ({
  welcomeText: {
    marginTop: '1rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();
  const [speedDialOpened, setSpeedDialOpened] = useState(false);
  const { timers } = useTimers();
  const [timerDuration, setTimerDuration] = useState(0);

  useEffect(() => {
    setTimerDuration(timers.pomodoro);
  }, [timers]);

  const handleSpeedDialOpen = () => {
    setSpeedDialOpened(true);
  };

  const handleSpeedDialClose = () => {
    setSpeedDialOpened(false);
  };

  const speedDialActions = [
    {
      icon: <PlayArrowIcon />,
      name: 'Pomodoro',
      handleClick: () => {
        setTimerDuration(timers.pomodoro);
        handleSpeedDialClose();
      },
    },
    {
      icon: <PauseIcon />,
      name: 'Short break',
      handleClick: () => {
        setTimerDuration(timers.shortBreak);
        handleSpeedDialClose();
      },
    },
    {
      icon: <LocalCafeIcon />,
      name: 'Long break',
      handleClick: () => {
        setTimerDuration(timers.longBreak);
        handleSpeedDialClose();
      },
    },
  ];

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
      <SpeedDial
        ariaLabel="Pomodoro timer options"
        className={classes.speedDial}
        icon={<TimerIcon />}
        onClose={handleSpeedDialClose}
        onOpen={handleSpeedDialOpen}
        open={speedDialOpened}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.handleClick}
          />
        ))}
      </SpeedDial>
    </div>
  );
}

export default Home;
