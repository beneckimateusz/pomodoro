import { gql, useMutation } from '@apollo/client';
import { Dialog, DialogTitle } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import useSettings from '../../hooks/useSettings';
import { saveSettingsToStorage } from '../../lib/settings';
import { bottomCenterSnackbarOptions } from '../../lib/utils';
import SettingsForm from './SettingsForm/SettingsForm';

const UPDATE_USER_SETTINGS = gql`
  mutation UpdateUserSettings($settings: UserSettingsInput!) {
    updateUserSettings(settings: $settings) {
      timers {
        pomodoro
        shortBreak
        longBreak
      }
      desktopAlerts
      darkTheme
    }
  }
`;

// TODO: If the user denies permission for desktop alerts in browser interface
// instead of the settings panel, opening settings again notices that change
// and updates it in storage/db.
// Problem: That one time it automatically closes settings and shows snackbar

function SettingsDialog({ opened, onClose }) {
  const { currentUser } = useCurrentUser();
  const { settings, changeSettings } = useSettings();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleValidSettingsUpdate = useCallback(
    (data) => {
      changeSettings(data);
      enqueueSnackbar('Settings saved', bottomCenterSnackbarOptions('info'));
      handleClose();
    },
    [changeSettings, enqueueSnackbar, handleClose]
  );

  const [updateUserSettings, { loading, error }] = useMutation(
    UPDATE_USER_SETTINGS,
    {
      onCompleted: ({ updateUserSettings: updatedSettings }) => {
        handleValidSettingsUpdate(updatedSettings);
      },
      onError: (err) => console.error(err),
    }
  );

  const handleValidSubmit = useCallback(
    (data) => {
      if (!currentUser) {
        handleValidSettingsUpdate(data);
        saveSettingsToStorage(data);
      } else {
        updateUserSettings({ variables: { settings: data } });
      }
    },
    [currentUser, updateUserSettings, handleValidSettingsUpdate]
  );

  return (
    <Dialog open={opened} onClose={handleClose}>
      <DialogTitle>Settings</DialogTitle>
      <SettingsForm
        initialValue={settings}
        onSubmit={handleValidSubmit}
        onClose={handleClose}
        disabled={loading}
        apiError={error}
      />
    </Dialog>
  );
}

SettingsDialog.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsDialog;
