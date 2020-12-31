import { createMuiTheme } from '@material-ui/core';
import { orange, red } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[400],
    },
    secondary: {
      main: orange[600],
    },
  },
});
