import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { ApiEndpoints, DOMAIN } from '../constants';
import Cookies from 'js-cookie';

interface TokenContextType {
  csrfToken: string | null;
  setCSRFToken: React.Dispatch<React.SetStateAction<string | null>>;
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  adminPasswordValidated: boolean;
  setAdminPasswordValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

const TokenContext = createContext<TokenContextType | null>(null);

interface TokenProviderProps {
  children: ReactNode;
}

export function TokenProvider({ children }: TokenProviderProps) {
  const [csrfToken, setCSRFToken] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem('userToken') || Cookies.get('userToken') || null
  );
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [adminPasswordValidated, setAdminPasswordValidated] =
    useState<boolean>(false);

  useEffect(() => {
    fetchCSRFToken().then((token) => setCSRFToken(token));
  }, []);

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

  return (
    <TokenContext.Provider
      value={{
        csrfToken,
        setCSRFToken,
        userToken,
        setUserToken,
        loggedIn,
        setLoggedIn,
        adminPasswordValidated,
        setAdminPasswordValidated,
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
