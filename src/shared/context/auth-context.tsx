/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  userId: '',
  login: (id: string) => {},
  logout: () => {},
});

export default AuthContext;
