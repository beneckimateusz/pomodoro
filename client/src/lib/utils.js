export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const bottomCenterSnackbarOptions = (variant) => ({
  variant,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  autoHideDuration: 3000,
});
