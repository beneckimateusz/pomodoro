import { ApolloProvider } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { client } from './apollo';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ApolloProvider client={client}>
          <CssBaseline />
          <Navigation />
        </ApolloProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
