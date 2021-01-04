import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';
import useSettings from '../../hooks/useSettings';
import Navigation from '../Navigation/Navigation';
import { themeObject } from './theme';

function App() {
  const {
    settings: { darkTheme },
  } = useSettings();

  const paletteType = darkTheme ? 'dark' : 'light';
  const theme = createMuiTheme({
    ...themeObject,
    palette: {
      ...themeObject.palette,
      type: paletteType,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Router>
          <CssBaseline />
          <Navigation />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
