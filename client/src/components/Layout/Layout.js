import { useApolloClient } from '@apollo/client';
import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

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
  const client = useApolloClient();
  const history = useHistory();
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const handleOpenUserMenu = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
    client.resetStore();
    setUserMenuAnchorEl(null);
  };

  const userMenu = () => (
    <>
      <IconButton onClick={handleOpenUserMenu} color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={userMenuAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(userMenuAnchorEl)}
        onClose={handleCloseUserMenu}
      >
        {currentUser
          ? [
              <MenuItem key="username" disabled>
                {currentUser.username}
              </MenuItem>,
              <MenuItem key="profile" onClick={handleCloseUserMenu}>
                Profile
              </MenuItem>,
              <MenuItem key="sign-out" onClick={handleLogout}>
                Sign Out
              </MenuItem>,
            ]
          : [
              <MenuItem
                key="sign-in"
                onClick={handleCloseUserMenu}
                component={Link}
                to="/sign-in"
              >
                Sign In
              </MenuItem>,
              <MenuItem
                key="sign-up"
                onClick={handleCloseUserMenu}
                component={Link}
                to="/sign-up"
              >
                Sign Up
              </MenuItem>,
            ]}
      </Menu>
    </>
  );

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
            <Grid item>{userMenu()}</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>{children}</div>
    </>
  );
}

Layout.propTypes = {
  currentUser: PropTypes.object,
  children: PropTypes.object.isRequired,
};

export default Layout;
