import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PropTypes from 'prop-types';

const Summary = ({ periodLength, totalPomodoroCount, totalDuration }) => {
  return (
    <Paper elevation={3}>
      <List>
        {periodLength > 1 && (
          <ListItem>
            <ListItemText secondary={`Last ${periodLength} days:`} />
          </ListItem>
        )}
        <ListItem>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText>
            Total duration: <strong>{totalDuration} min</strong>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PlayArrowIcon />
          </ListItemIcon>
          <ListItemText>
            Total pomodoros: <strong>{totalPomodoroCount}</strong>
          </ListItemText>
        </ListItem>
      </List>
    </Paper>
  );
};

Summary.propTypes = {
  periodLength: PropTypes.number.isRequired,
  totalPomodoroCount: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
};

export default Summary;
