import { Button, Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

function SignUpForm({ onSubmit, disabled, failed }) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={2}>
        {failed && (
          <Grid item>
            <Alert severity="error">Validation failed</Alert>
          </Grid>
        )}
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            name="username"
            label="Username"
            inputRef={register({ required: 'Username is required' })}
            error={!!errors.username}
            helperText={errors.username?.message}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            name="email"
            label="Email"
            inputRef={register({ required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
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
            inputRef={register({ required: 'Password is required' })}
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
  failed: PropTypes.bool.isRequired,
};

export default SignUpForm;
