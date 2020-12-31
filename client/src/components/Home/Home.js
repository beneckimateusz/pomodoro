import { Grid, makeStyles, Typography } from '@material-ui/core';
import Timer from '../Timer/Timer';

const useStyles = makeStyles((theme) => ({
  welcomeText: {
    marginTop: '1rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h5" className={classes.welcomeText}>
          Let's get to work, shall we?
        </Typography>
      </Grid>
      <Grid item>
        <Timer />
      </Grid>
    </Grid>
  );
}

export default Home;
