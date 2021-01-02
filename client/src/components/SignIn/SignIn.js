import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
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

function SignIn() {
  const client = useApolloClient();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [signIn, { loading, error }] = useMutation(SIGN_IN, {
    onCompleted: async ({ signIn }) => {
      if (signIn?.token) {
        localStorage.setItem('token', signIn.token);
        await client.reFetchObservableQueries();
        enqueueSnackbar('Successfully signed in', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          autoHideDuration: 3000,
        });
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
