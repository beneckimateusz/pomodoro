import { useContext } from 'react';
import UserContext from '../context/User/User';

function useCurrentUser() {
  const { currentUser, loading } = useContext(UserContext);

  return { currentUser, loading };
}

export default useCurrentUser;
