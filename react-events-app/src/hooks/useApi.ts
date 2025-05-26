import { useCallback, useState } from 'react';
import { DOMAIN } from '../constants';
import { useAuth } from '../context/AuthContext';

interface FetchOptions extends RequestInit {
  body?: any;
}

export function useApi() {
  const { csrfToken, userToken } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchWithTokens = useCallback(
    async (url: string, options: FetchOptions = {}) => {
      setLoading(true);
      const headers: HeadersInit = {
        'X-CSRFToken': csrfToken || '',
        Authorization: userToken ? `Token ${userToken}` : '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      };

      const fetchOptions: RequestInit = {
        credentials: 'include',
        mode: 'cors',
        ...options,
        headers,
      };

      if (options.body && typeof options.body === 'object') {
        fetchOptions.body = JSON.stringify(options.body);
      }

      const response = await fetch(`${DOMAIN}/${url}`, fetchOptions);

      if (response.status === 204) {
        return { deleted: true };
      }

      if (!response.ok) {
        throw response;
      }
      setLoading(false);
      return response.json();
    },
    [csrfToken, userToken]
  );

  return { fetchWithTokens, loading };
}
