import { ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { client } from './apollo';

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Navigation />
      </ApolloProvider>
    </Router>
  );
}

export default App;
