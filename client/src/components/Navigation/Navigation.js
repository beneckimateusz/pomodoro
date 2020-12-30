import { gql, useQuery } from '@apollo/client';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Loading from '../Loading/Loading';
import SignIn from '../SignIn/SignIn';

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
          <h1>Main page</h1>
        </Route>
        <Route>
          {!me && (
            <Switch>
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
