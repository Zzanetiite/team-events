import { useEffect, useCallback } from 'react';
import { useTokens } from '../context/TokenContext';
import { useDataContext } from '../context/DataContext';
import { ApiEndpoints } from '../constants';
import { useApi } from './useApi';

export const useNavBar = () => {
  const { fetchWithTokens } = useApi();
  const {
    setUserToken,
    setLoggedIn,
    loggedIn,
    username,
    isAdmin,
    setIsAdmin,
    setUsername,
  } = useTokens();
  const { homePageFilterOpen, setHomePageFilterOpen } = useDataContext();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const data = await fetchWithTokens(ApiEndpoints.GET_USERNAME);
        setUsername(data.username);
        setIsAdmin(data.is_admin || false);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    if (loggedIn && !username) {
      fetchUsername();
    }
  }, [loggedIn, username, setIsAdmin, setUsername, fetchWithTokens]);

  const handleLogout = useCallback(async () => {
    try {
      const response = await fetchWithTokens(ApiEndpoints.LOGOUT, {
        method: 'POST',
      });
      if (response) {
        setUserToken(null);
        setLoggedIn(false);
        setIsAdmin(null);
        window.location.href = '/login';
      } else {
        console.error('Logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setUserToken(null);
      setLoggedIn(false);
      setIsAdmin(null);
    }
  }, [fetchWithTokens, setUserToken, setLoggedIn, setIsAdmin]);

  const handleLogin = useCallback(() => {
    window.location.href = '/login';
  }, []);

  const handleEventsButton = useCallback(() => {
    window.location.href = '/myevents';
  }, []);

  const handleFilterOpen = useCallback(() => {
    setHomePageFilterOpen(!homePageFilterOpen);
  }, [homePageFilterOpen, setHomePageFilterOpen]);

  return {
    loggedIn,
    username,
    isAdmin,
    handleLogout,
    handleLogin,
    handleEventsButton,
    handleFilterOpen,
  };
};
