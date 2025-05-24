import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import { ApiEndpoints, DOMAIN, USER_COOKIE_LENGTH_DAYS } from '../constants';

interface UserType {
  username: string | null;
  isAdmin: boolean | null;
  userId: number | null;
}

interface AuthContextType {
  csrfToken: string | null;
  setCSRFToken: React.Dispatch<React.SetStateAction<string | null>>;
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [csrfToken, setCSRFToken] = useState<string | null>(
    Cookies.get('csrftoken') || null
  );
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem('userToken') || Cookies.get('userToken') || null
  );
  const [loggedIn, setLoggedIn] = useState<boolean>(userToken !== null);
  const [user, setUser] = useState<UserType>({
    username:
      localStorage.getItem('username') || Cookies.get('username') || null,
    isAdmin: JSON.parse(Cookies.get('isAdmin') || 'null'),
    userId:
      parseInt(
        localStorage.getItem('userId') || Cookies.get('userId') || 'null',
        10
      ) || null,
  });

  useEffect(() => {
    if (!csrfToken) {
      fetchCSRFToken().then((token) => {
        if (token) {
          setCSRFToken(token);
          Cookies.set('csrftoken', token, { expires: 1 });
        }
      });
    }
  }, [csrfToken]);

  useEffect(() => {
    if (userToken) {
      localStorage.setItem('userToken', userToken);
      Cookies.set('userToken', userToken, { expires: USER_COOKIE_LENGTH_DAYS });
      setLoggedIn(true);
    } else {
      localStorage.removeItem('userToken');
      Cookies.remove('userToken');
      setLoggedIn(false);
    }
  }, [userToken]);

  useEffect(() => {
    if (user.username) {
      localStorage.setItem('username', user.username);
      Cookies.set('username', user.username, {
        expires: USER_COOKIE_LENGTH_DAYS,
      });
    } else {
      localStorage.removeItem('username');
      Cookies.remove('username');
    }

    if (user.isAdmin !== null) {
      Cookies.set('isAdmin', JSON.stringify(user.isAdmin), {
        expires: USER_COOKIE_LENGTH_DAYS,
      });
    } else {
      Cookies.remove('isAdmin');
    }

    if (user.userId !== null) {
      localStorage.setItem('userId', user.userId.toString());
      Cookies.set('userId', user.userId.toString(), {
        expires: USER_COOKIE_LENGTH_DAYS,
      });
    } else {
      localStorage.removeItem('userId');
      Cookies.remove('userId');
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        csrfToken,
        setCSRFToken,
        userToken,
        setUserToken,
        user,
        setUser,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider Context');
  }
  return context;
}

async function fetchCSRFToken(): Promise<string | null> {
  try {
    const response = await fetch(`${DOMAIN}/${ApiEndpoints.GET_CSRF_TOKEN}`, {
      credentials: 'include',
    });
    if (response.ok) {
      const csrfToken = Cookies.get('csrftoken');
      return csrfToken || null;
    }
    throw new Error('Failed to fetch CSRF token');
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
}
