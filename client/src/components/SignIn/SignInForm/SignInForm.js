import { Button, Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Loading from '../../Loading/Loading';

function SignInForm({ onSubmit, disabled, apiError }) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <TextField
            fullWidth
            variant="outlined"
            color="secondary"
            name="login"
            label="Username/Email"
            inputRef={register({ required: 'Username/Email is required' })}
            error={!!errors.login}
            helperText={errors.login?.message}
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

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  apiError: PropTypes.object,
};

export default SignInForm;
