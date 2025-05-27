import { useCallback, useState } from 'react';
import { DOMAIN } from '../constants';
import { useAuth } from '../context/AuthContext';

interface FetchOptions extends RequestInit {
  body?: any;
}

export function useApi() {
  const { csrfToken, userToken, refreshCSRFToken } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchWithTokens = useCallback(
    async (url: string, options: FetchOptions = {}) => {
      setLoading(true);

      const buildHeaders = (): HeadersInit => ({
        'X-CSRFToken': csrfToken || '',
        Authorization: userToken ? `Token ${userToken}` : '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      });

      const buildFetchOptions = (): RequestInit => {
        const headers = buildHeaders();
        const fetchOptions: RequestInit = {
          credentials: 'include',
          mode: 'cors',
          ...options,
          headers,
        };

        if (options.body && typeof options.body === 'object') {
          fetchOptions.body = JSON.stringify(options.body);
        }

        return fetchOptions;
      };

      const doFetch = async (): Promise<any> => {
        const response = await fetch(`${DOMAIN}/${url}`, buildFetchOptions());

        if (response.status === 204) {
          return { deleted: true };
        }

        if (!response.ok) {
          throw response;
        }

        return response.json();
      };

      try {
        try {
          return await doFetch();
        } catch (err: any) {
          if (err.status === 403) {
            await refreshCSRFToken();
            return await doFetch(); // retry once
          }
          throw err;
        }
      } finally {
        setLoading(false);
      }
    },
    [csrfToken, userToken, refreshCSRFToken]
  );

  return { fetchWithTokens, loading };
}
