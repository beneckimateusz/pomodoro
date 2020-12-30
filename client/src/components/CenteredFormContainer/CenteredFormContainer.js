import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  content: {
    minWidth: '40%',
  },
}));

function CenteredFormContainer({ title, children }) {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item className={classes.content}>
        {children}
      </Grid>
    </Grid>
  );
}

CenteredFormContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object.isRequired,
};

export default CenteredFormContainer;
