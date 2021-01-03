import { ApolloProvider } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';
import { SettingsProvider } from '../../context/Settings';
import Navigation from '../Navigation/Navigation';
import { client } from './apollo';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <SettingsProvider>
          <Router>
            <ApolloProvider client={client}>
              <CssBaseline />
              <Navigation />
            </ApolloProvider>
          </Router>
        </SettingsProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
