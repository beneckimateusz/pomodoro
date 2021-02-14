import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  bold: {
    fontWeight: 500,
  },
}));

const Summary = ({ totalPomodoroCount, totalDuration }) => {
  const classes = useStyles();

  return (
    <Paper elevation={3}>
      <List>
        <ListItem>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText>
            Total duration:{' '}
            <span className={classes.bold}>{totalDuration} min</span>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PlayArrowIcon />
          </ListItemIcon>
          <ListItemText>
            Total pomodoros:{' '}
            <span className={classes.bold}>{totalPomodoroCount}</span>
          </ListItemText>
        </ListItem>
      </List>
    </Paper>
  );
};

Summary.propTypes = {
  totalPomodoroCount: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
};

export default Summary;
