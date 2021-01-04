import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  InputAdornment,
  makeStyles,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Loading from '../../Loading/Loading';

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.primary.main,
  },
}));

function SettingsForm({ initialValue, onSubmit, onClose, disabled, apiError }) {
  const classes = useStyles();
  const {
    register,
    control,
    errors,
    getValues,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: initialValue,
  });
  const [notificationsSupported, setNotificationsSupported] = useState(null);

  useEffect(() => {
    const browserNotificationSupport = 'Notification' in window;
    setNotificationsSupported(browserNotificationSupport);

    if (!browserNotificationSupport) {
      setValue('desktopAlerts', false);
    } else if (
      getValues('desktopAlerts') &&
      Notification.permission !== 'granted'
    ) {
      setValue('desktopAlerts', false);
      onSubmit(getValues());
    }
  }, [setValue, getValues, onSubmit]);

  const handleDesktopAlertsToggle = async (e) => {
    if (e.target.checked) {
      if (Notification.permission !== 'granted') {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;
      }
      setValue('desktopAlerts', true);
    } else {
      setValue('desktopAlerts', false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          {disabled && (
            <Grid container item justify="center">
              <Grid item>
                <Loading />
              </Grid>
            </Grid>
          )}
          {apiError && (
            <Grid item>
              <Alert severity="error">{apiError.message}</Alert>
            </Grid>
          )}
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
            <Typography variant="h6">Other</Typography>
          </Grid>
          <Grid item>
            <Controller
              name="desktopAlerts"
              control={control}
              render={(props) => (
                <Switch
                  color="primary"
                  disabled={!notificationsSupported}
                  checked={props.value}
                  onChange={handleDesktopAlertsToggle}
                />
              )}
            />
            Desktop alerts
            {!notificationsSupported && (
              <div className={classes.error}>
                Your browser doesn't support notifications
              </div>
            )}
          </Grid>
          <Grid item>
            <Controller
              name="darkTheme"
              control={control}
              render={(props) => (
                <Switch
                  color="primary"
                  checked={props.value}
                  onChange={(e) => props.onChange(e.target.checked)}
                />
              )}
            />
            Dark theme
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
  disabled: PropTypes.bool.isRequired,
  apiError: PropTypes.object,
};

export default SettingsForm;
