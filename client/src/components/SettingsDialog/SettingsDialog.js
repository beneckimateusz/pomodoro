import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useTimers } from '../../hooks/useTimers';

function SettingsDialog({ opened, onClose }) {
  const { timers, setTimers } = useTimers();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      timers,
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    onClose();
  };

  const handleValidSubmit = (data) => {
    setTimers(data.timers);
    enqueueSnackbar('Settings saved', {
      variant: 'info',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      autoHideDuration: 3000,
    });

    handleClose();
  };

  return (
    <Dialog open={opened} onClose={handleClose}>
      <form onSubmit={handleSubmit(handleValidSubmit)}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h6">Timer durations</Typography>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item sm={4}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  name="timers[pomodoro]"
                  label="Pomodoro"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">min</InputAdornment>
                    ),
                  }}
                  inputRef={register({
                    min: {
                      value: 1,
                      message: "Pomodoro can't be shorter than 1 minute",
                    },
                    valueAsNumber: true,
                  })}
                  error={!!errors.timers?.pomodoro}
                  helperText={errors.timers?.pomodoro?.message}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  name="timers[shortBreak]"
                  label="Short break"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">min</InputAdornment>
                    ),
                  }}
                  inputRef={register({
                    min: {
                      value: 1,
                      message: "A break can't be shorter than 1 minute",
                    },
                    valueAsNumber: true,
                  })}
                  error={!!errors.timers?.shortBreak}
                  helperText={errors.timers?.shortBreak?.message}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  name="timers[longBreak]"
                  label="Long break"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">min</InputAdornment>
                    ),
                  }}
                  inputRef={register({
                    min: {
                      value: 1,
                      message: "A break can't be shorter than 1 minute",
                    },
                    valueAsNumber: true,
                  })}
                  error={!!errors.timers?.longBreak}
                  helperText={errors.timers?.longBreak?.message}
                />
              </Grid>
            </Grid>
            <Grid item>
              {/* an empty element as a workaround for unwanted scroll */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

SettingsDialog.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsDialog;
