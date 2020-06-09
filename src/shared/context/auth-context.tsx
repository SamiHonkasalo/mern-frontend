/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';

interface Context {
  isLoggedIn: boolean;
  userId: string;
  token: string | null;
  login: (id: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<Context>({
  isLoggedIn: false,
  userId: '',
  token: null,
  login: (id: string, token: string) => {},
  logout: () => {},
});

export default AuthContext;
