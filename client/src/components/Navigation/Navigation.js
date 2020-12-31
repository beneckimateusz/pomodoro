import { gql, useQuery } from '@apollo/client';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Layout from '../Layout/Layout';
import Loading from '../Loading/Loading';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

export const CURRENT_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

function Navigation() {
  const { loading, error, data } = useQuery(CURRENT_USER);

  if (loading) return <Loading />;
  if (error) return 'Houston! We have a problem.';
  const { me } = data;

  return (
    <Layout currentUser={me}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          {!me && (
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
