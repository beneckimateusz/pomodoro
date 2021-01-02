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
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

function SettingsDialog({ opened, onClose }) {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
    },
  });

  const handleValidSubmit = (data) => {
    console.log(data);
  };

  const handleClose = () => {
    onClose();
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
                  name="pomodoro"
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
                  error={!!errors.pomodoro}
                  helperText={errors.pomodoro?.message}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  name="shortBreak"
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
                  error={!!errors.shortBreak}
                  helperText={errors.shortBreak?.message}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  name="longBreak"
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
                  error={!!errors.longBreak}
                  helperText={errors.longBreak?.message}
                />
              </Grid>
            </Grid>
            <Grid item>
              {/* an empty element as a workaround for unwanted scroll */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
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
