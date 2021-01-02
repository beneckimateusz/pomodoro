import { useApolloClient } from '@apollo/client';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function UserMenu({ currentUser }) {
  const client = useApolloClient();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const handleOpenUserMenu = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    enqueueSnackbar('Successfully signed out', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      autoHideDuration: 3000,
    });
    history.push('/');
    client.resetStore();
    setUserMenuAnchorEl(null);
  };

  return (
    <div>
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
    </div>
  );
}

UserMenu.propTypes = {
  currentUser: PropTypes.object,
};

export default UserMenu;
