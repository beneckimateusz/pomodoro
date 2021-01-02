import { Button, Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

function SignUpForm({ onSubmit, disabled, apiError }) {
  const { register, handleSubmit, errors } = useForm();

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
            color="secondary"
            name="username"
            label="Username"
            inputRef={register({
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username should have at least 3 characters',
              },
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            color="secondary"
            name="email"
            label="Email"
            inputRef={register({
              required: 'Email is required',
              pattern: { value: /.+@.+\..+/, message: 'Invalid email' },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            color="secondary"
            name="password"
            label="Password"
            type="password"
            inputRef={register({
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should have at least 8 characters',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
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
