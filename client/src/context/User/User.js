import { gql, useQuery } from '@apollo/client';
import React from 'react';

const UserContext = React.createContext();

export const CURRENT_USER = gql`
  query {
    me {
      id
      username
      settings {
        timers {
          pomodoro
          shortBreak
          longBreak
        }
        desktopAlerts
        darkTheme
      }
    }
  }
`;

export function UserProvider({ children }) {
  const { loading, error, data } = useQuery(CURRENT_USER);
  const currentUser = data?.me;

  return (
    <UserContext.Provider value={{ loading, error, currentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
