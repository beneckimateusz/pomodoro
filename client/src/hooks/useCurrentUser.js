import { useContext } from 'react';
import UserContext from '../context/User/User';

function useCurrentUser() {
  const { currentUser } = useContext(UserContext);

  return { currentUser };
}

export default useCurrentUser;
