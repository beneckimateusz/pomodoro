import {
  Divider,
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
  centeredText: {
    textAlign: 'center',
  },
}));

const Summary = ({
  totalPomodoroCount,
  totalDuration,
  avgDuration,
  avgPomodoroCount,
  avgUnit,
}) => {
  const classes = useStyles();

  const showAverages = () => {
    return (
      <>
        <Divider />
        <ListItem>
          <ListItemText className={classes.centeredText}>
            Averages ({avgUnit.toLowerCase()})
          </ListItemText>
        </ListItem>
        {avgDuration && (
          <ListItem>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText>
              Duration:{' '}
              <span className={classes.bold}>{avgDuration.toFixed(2)} min</span>
            </ListItemText>
          </ListItem>
        )}
        {avgPomodoroCount && (
          <ListItem>
            <ListItemIcon>
              <PlayArrowIcon />
            </ListItemIcon>
            <ListItemText>
              Pomodoros:{' '}
              <span className={classes.bold}>
                {avgPomodoroCount.toFixed(2)}
              </span>
            </ListItemText>
          </ListItem>
        )}
      </>
    );
  };

  return (
    <Paper elevation={3}>
      <List>
        <ListItem>
          <ListItemText className={classes.centeredText}>Totals</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText>
            Duration: <span className={classes.bold}>{totalDuration} min</span>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PlayArrowIcon />
          </ListItemIcon>
          <ListItemText>
            Pomodoros:{' '}
            <span className={classes.bold}>{totalPomodoroCount}</span>
          </ListItemText>
        </ListItem>
        {(avgDuration || avgPomodoroCount) && showAverages()}
      </List>
    </Paper>
  );
};

Summary.propTypes = {
  totalPomodoroCount: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
  avgDuration: PropTypes.number,
  avgPomodoroCount: PropTypes.number,
  avgUnit: PropTypes.string,
};

export default Summary;
