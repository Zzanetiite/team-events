import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import { ApiEndpoints, DOMAIN } from '../constants';

interface TokenContextType {
  csrfToken: string | null;
  setCSRFToken: React.Dispatch<React.SetStateAction<string | null>>;
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  adminPasswordValidated: boolean;
  setAdminPasswordValidated: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean | null;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const TokenContext = createContext<TokenContextType | null>(null);

interface TokenProviderProps {
  children: ReactNode;
}

export function TokenProvider({ children }: TokenProviderProps) {
  const [csrfToken, setCSRFToken] = useState<string | null>(
    Cookies.get('csrftoken') || null
  );
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem('userToken') || Cookies.get('userToken') || null
  );
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem('username') || Cookies.get('username') || null
  );
  const [loggedIn, setLoggedIn] = useState<boolean>(userToken !== null);
  const [adminPasswordValidated, setAdminPasswordValidated] =
    useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(
    JSON.parse(Cookies.get('isAdmin') || 'null')
  );

  useEffect(() => {
    if (!csrfToken) {
      fetchCSRFToken().then((token) => setCSRFToken(token));
    }
  }, [csrfToken]);

  useEffect(() => {
    if (userToken) {
      localStorage.setItem('userToken', userToken);
      Cookies.set('userToken', userToken, { expires: 7 });
      setLoggedIn(true);
    } else {
      localStorage.removeItem('userToken');
      Cookies.remove('userToken');
      setLoggedIn(false);
    }
  }, [userToken]);

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
      Cookies.set('username', username, { expires: 7 });
    } else {
      localStorage.removeItem('username');
      Cookies.remove('username');
    }
  }, [username]);

  useEffect(() => {
    if (isAdmin !== null) {
      Cookies.set('isAdmin', JSON.stringify(isAdmin), { expires: 7 });
    } else {
      Cookies.remove('isAdmin');
    }
  }, [isAdmin]);

  return (
    <TokenContext.Provider
      value={{
        csrfToken,
        setCSRFToken,
        userToken,
        setUserToken,
        username,
        setUsername,
        loggedIn,
        setLoggedIn,
        adminPasswordValidated,
        setAdminPasswordValidated,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export function useTokens(): TokenContextType {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useTokens must be used within a TokenProvider Context');
  }
  return context;
}

async function fetchCSRFToken(): Promise<string | null> {
  try {
    const response = await fetch(`${DOMAIN}/${ApiEndpoints.GET_CSRF_TOKEN}`, {
      credentials: 'include',
    });
    if (response.ok) {
      const csrfToken = getCookie('csrftoken');
      if (csrfToken) {
        return csrfToken;
      }
    }
    throw new Error('Failed to fetch CSRF token');
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
}

function getCookie(name: string): string | null {
  return Cookies.get(name) || null;
}
