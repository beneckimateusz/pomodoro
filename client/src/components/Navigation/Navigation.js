import { Fade, LinearProgress } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import Home from '../Home/Home';
import Layout from '../Layout/Layout';
import Report from '../Report/Report';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

function Navigation() {
  const { currentUser, loading } = useCurrentUser();

  if (loading) {
    return (
      <Fade in={true}>
        <LinearProgress />
      </Fade>
    );
  }

  return (
    <Layout currentUser={currentUser}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/report">
          <Report />
        </Route>
        <Route>
          {!currentUser && (
            <Switch>
              <Route exact path="/sign-up">
                <SignUp />
              </Route>
              <Route exact path="/sign-in">
                <SignIn />
              </Route>
              <Redirect to="/" />
            </Switch>
          )}
        </Route>
      </Switch>
    </Layout>
  );
}

export default Navigation;
