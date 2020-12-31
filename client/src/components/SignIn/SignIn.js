import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import CenteredFormContainer from '../CenteredFormContainer/CenteredFormContainer';
import SignInForm from './SignInForm/SignInForm';

const SIGN_IN = gql`
  mutation SignIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

function SignIn(props) {
  const client = useApolloClient();
  const history = useHistory();
  const [signIn, { loading, error }] = useMutation(SIGN_IN, {
    onCompleted: async ({ signIn }) => {
      if (signIn?.token) {
        localStorage.setItem('token', signIn.token);
        await client.reFetchObservableQueries();
        history.push('/');
      }
    },
    onError: (err) => {},
  });

  const handleSubmit = ({ login, password }) => {
    signIn({ variables: { login, password } });
  };

  return (
    <CenteredFormContainer title="Sign In">
      <SignInForm onSubmit={handleSubmit} disabled={loading} apiError={error} />
    </CenteredFormContainer>
  );
}

export default SignIn;
