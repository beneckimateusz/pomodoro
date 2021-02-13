import alertIcon from '../assets/alert_icon.png';

export const showBrowserNotification = (title, body) =>
  new Notification(title, {
    body,
    icon: alertIcon,
  });

export const bottomCenterSnackbarOptions = (variant) => ({
  variant,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  autoHideDuration: 3000,
});
