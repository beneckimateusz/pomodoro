import { Dialog, DialogTitle } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useTimers } from '../../hooks/useTimers';
import SettingsForm from './SettingsForm/SettingsForm';

function SettingsDialog({ opened, onClose }) {
  const { timers, setTimers } = useTimers();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    onClose();
  };

  const handleValidSubmit = (data) => {
    setTimers(data.timers);
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
        initialValue={{ timers }}
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
