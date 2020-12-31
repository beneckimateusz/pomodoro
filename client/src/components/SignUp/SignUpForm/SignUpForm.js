import { Button, Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { createErrorMessages } from '../../../lib/form';

function SignUpForm({ onSubmit, disabled, apiError }) {
  const { register, handleSubmit, errors } = useForm();

  const minLengths = {
    username: 3,
    password: 8,
  };

  const errorMessages = createErrorMessages(errors, minLengths);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={2}>
        {apiError && (
          <Grid item>
            <Alert severity="error">{apiError.message}</Alert>
          </Grid>
        )}
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            name="username"
            label="Username"
            inputRef={register({
              required: true,
              minLength: minLengths.username,
            })}
            error={!!errors.username}
            helperText={errors.username && errorMessages.username}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            name="email"
            label="Email"
            inputRef={register({ required: true, pattern: /.+@.+/ })}
            error={!!errors.email}
            helperText={errors.email && errorMessages.email}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            name="password"
            label="Password"
            type="password"
            inputRef={register({
              required: true,
              minLength: minLengths.password,
            })}
            error={!!errors.password}
            helperText={errors.password && errorMessages.password}
            disabled={disabled}
          />
        </Grid>
        <Grid item container justify="center">
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              disabled={disabled}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  apiError: PropTypes.object,
};

export default SignUpForm;
