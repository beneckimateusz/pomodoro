import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import CenteredFormContainer from '../CenteredFormContainer/CenteredFormContainer';
import SignUpForm from './SignUpForm/SignUpForm';

const SIGN_UP = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

function SignUp() {
  const client = useApolloClient();
  const history = useHistory();
  const [signUp, { loading, error }] = useMutation(SIGN_UP, {
    onCompleted: async ({ signUp }) => {
      if (signUp?.token) {
        localStorage.setItem('token', signUp.token);
        await client.reFetchObservableQueries();
        history.push('/');
      }
    },
    onError: (err) => {},
  });

  const handleSubmit = ({ username, email, password }) => {
    signUp({ variables: { username, email, password } });
  };

  return (
    <CenteredFormContainer title="Sign Up">
      <SignUpForm onSubmit={handleSubmit} disabled={loading} apiError={error} />
    </CenteredFormContainer>
  );
}

export default SignUp;
