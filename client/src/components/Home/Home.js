import { Grid, Hidden, makeStyles } from '@material-ui/core';
import KeyboardShortcutsCard from '../KeyboardShortcutsCard/KeyboardShortcutsCard';
import Timer from '../Timer/Timer';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '85vh',
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-evenly"
        spacing={2}
        className={classes.root}
      >
        <Timer />
        <Hidden smDown>
          <Grid item>
            <KeyboardShortcutsCard />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

export default Home;
