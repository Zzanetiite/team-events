import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiEndpoints } from '../constants';
import { useApi } from './useApi';

export const useNavBar = () => {
  const { fetchWithTokens } = useApi();
  const { setUserToken, setLoggedIn, loggedIn, user, setUser } = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      const response = await fetchWithTokens(ApiEndpoints.LOGOUT, {
        method: 'POST',
      });
      if (response) {
        setUser({
          username: null,
          isAdmin: null,
          userId: null,
        });
        setUserToken(null);
        setLoggedIn(false);
        window.location.href = '/login';
      } else {
        console.error('Logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setUser({
        username: null,
        isAdmin: null,
        userId: null,
      });
      setUserToken(null);
      setLoggedIn(false);
    }
  }, [fetchWithTokens, setUserToken, setLoggedIn, setUser]);

  const handleHome = useCallback(() => {
    window.location.href = '/';
  }, []);

  const handleLogin = useCallback(() => {
    window.location.href = '/login';
  }, []);

  const handleEventsButton = useCallback(() => {
    window.location.href = '/myevents';
  }, []);

  const handleSignUpButton = useCallback(() => {
    window.location.href = '/signup';
  }, []);

  return {
    loggedIn,
    user,
    handleLogout,
    handleLogin,
    handleEventsButton,
    handleSignUpButton,
    handleHome,
  };
};
