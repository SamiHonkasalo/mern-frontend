import { useState, useCallback, useEffect } from 'react';

let logoutTimer: NodeJS.Timeout;

function useAuth(): {
  token: string | null;
  userId: string;
  login: (id: string, token: string, expDate?: Date) => void;
  logout: () => void;
} {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState('');
  const [tokenExpirationDate, setTokenExpirationDate] = useState<null | Date>(
    null
  );

  const login = useCallback((id: string, _token: string, expDate?: Date) => {
    setToken(_token);
    setUserId(id);
    const expirationDate =
      expDate || new Date(new Date().getTime() + 1000 * 60 * 60); // Plus 1h
    setTokenExpirationDate(expirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: id,
        token: _token,
        expiration: expirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('userData');
    setTokenExpirationDate(null);
    setToken(null);
    setUserId('');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(() => {
        logout();
      }, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, token, tokenExpirationDate]);

  // Login when mounted if data found on localstorage
  useEffect(() => {
    const lsData = localStorage.getItem('userData');
    let userData = null;
    if (lsData) {
      userData = JSON.parse(lsData);
    }
    if (
      userData &&
      userData.userId &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      login(userData.userId, userData.token, new Date(userData.expiration));
    }
  }, [login]);

  return { token, userId, login, logout };
}

export default useAuth;
