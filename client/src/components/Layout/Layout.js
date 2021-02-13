import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import InfoIcon from '@material-ui/icons/Info';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoDialog from '../InfoDialog/InfoDialog';
import SettingsDialog from '../SettingsDialog/SettingsDialog';
import UserMenu from './UserMenu/UserMenu';

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'inherit',
    textDecoration: 'none',
  },
  logo: {
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
}));

function Layout({ currentUser, children }) {
  const classes = useStyles();
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [infoOpened, setInfoOpened] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <AlarmOnIcon className={classes.logo} />
            </Grid>
            <Grid item className={classes.grow}>
              <Typography
                variant="h6"
                className={classes.title}
                component={Link}
                to="/"
              >
                pomodoro
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setInfoOpened(true)} color="inherit">
                <InfoIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="inherit" component={Link} to="/report">
                <AssessmentIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => setSettingsOpened(true)}
                color="inherit"
              >
                <SettingsIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <UserMenu currentUser={currentUser} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <SettingsDialog
        opened={settingsOpened}
        onClose={() => setSettingsOpened(false)}
      />
      <InfoDialog opened={infoOpened} onClose={() => setInfoOpened(false)} />
      <div className={classes.content}>{children}</div>
    </>
  );
}

Layout.propTypes = {
  currentUser: PropTypes.object,
  children: PropTypes.object.isRequired,
};

export default Layout;
