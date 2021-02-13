import { makeStyles } from '@material-ui/core';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import TimerIcon from '@material-ui/icons/Timer';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { TimerType } from '../../lib/timer';

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  tooltipLabel: {
    whiteSpace: 'nowrap',
  },
}));

function TimerTypePicker({ onChange }) {
  const classes = useStyles();
  const [speedDialOpened, setSpeedDialOpened] = useState(false);

  const toggleSpeedDial = () => {
    setSpeedDialOpened(!speedDialOpened);
  };

  const handleSpeedDialClose = () => {
    setSpeedDialOpened(false);
  };

  const speedDialActions = [
    {
      icon: <LocalCafeIcon />,
      name: 'Long break',
      handleClick: () => {
        onChange(TimerType.LONG_BREAK);
        handleSpeedDialClose();
      },
    },
    {
      icon: <PauseIcon />,
      name: 'Short break',
      handleClick: () => {
        onChange(TimerType.SHORT_BREAK);
        handleSpeedDialClose();
      },
    },
    {
      icon: <PlayArrowIcon />,
      name: 'Pomodoro',
      handleClick: () => {
        onChange(TimerType.POMODORO);
        handleSpeedDialClose();
      },
    },
  ];

  return (
    <SpeedDial
      ariaLabel="Pomodoro timer options"
      className={classes.speedDial}
      icon={<TimerIcon />}
      onClick={toggleSpeedDial}
      open={speedDialOpened}
    >
      {speedDialActions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          classes={{ staticTooltipLabel: classes.tooltipLabel }}
          onClick={action.handleClick}
        />
      ))}
    </SpeedDial>
  );
}

TimerTypePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default TimerTypePicker;
