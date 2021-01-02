import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

function SettingsForm({ initialValue, onSubmit, onClose }) {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: initialValue,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button onClick={onClose}>Close</Button>
        <Button type="submit" color="primary">
          Save
        </Button>
      </DialogActions>
    </form>
  );
}

SettingsForm.propTypes = {
  initialValue: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsForm;
