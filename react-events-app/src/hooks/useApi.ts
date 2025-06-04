import { useCallback, useState } from 'react';
import { ApiEndpoints, DOMAIN } from '../constants';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';

interface FetchOptions extends RequestInit {
  body?: any;
}

export function useApi() {
  const { csrfToken, userToken, setLoggedIn } = useAuth();
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

      let hasRetried = false;

      try {
        try {
          return await doFetch();
        } catch (err: any) {
          // Deal with old cookies (between deployments they become invalid)
          if (
            err.status === 403 &&
            !hasRetried &&
            (url.includes(ApiEndpoints.GET_NEARBY_EVENTS) ||
              url.includes(ApiEndpoints.CREATE_ADMIN_USER) ||
              url.includes(ApiEndpoints.CREATE_USER))
          ) {
            hasRetried = true;
            console.warn(
              '403 received — clearing cookies and retrying once...'
            );
            Object.keys(Cookies.get()).forEach((cookie) => {
              Cookies.remove(cookie);
            });
            setLoggedIn(false);
            return await doFetch();
          }
          throw err;
        }
      } finally {
        setLoading(false);
      }
    },
    [csrfToken, userToken, setLoggedIn]
  );

  return { fetchWithTokens, loading };
}
