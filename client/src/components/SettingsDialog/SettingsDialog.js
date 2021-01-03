import { Dialog, DialogTitle } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import useSettings from '../../hooks/useSettings';
import SettingsForm from './SettingsForm/SettingsForm';

function SettingsDialog({ opened, onClose }) {
  const { settings, changeSettings } = useSettings();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    onClose();
  };

  const handleValidSubmit = (data) => {
    changeSettings(data);
    enqueueSnackbar('Settings saved', {
      variant: 'info',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      autoHideDuration: 3000,
    });

    handleClose();
  };

  return (
    <Dialog open={opened} onClose={handleClose}>
      <DialogTitle>Settings</DialogTitle>
      <SettingsForm
        initialValue={settings}
        onSubmit={handleValidSubmit}
        onClose={handleClose}
      />
    </Dialog>
  );
}

SettingsDialog.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsDialog;
