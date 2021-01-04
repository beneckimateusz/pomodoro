import { Redirect, Route, Switch } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import Home from '../Home/Home';
import Layout from '../Layout/Layout';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

function Navigation() {
  const { currentUser } = useCurrentUser();

  return (
    <Layout currentUser={currentUser}>
      <Switch>
        <Route exact path="/">
          <Home />
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
