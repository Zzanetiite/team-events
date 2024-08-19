import { DOMAIN } from '../constants';
import { useTokens } from '../context/TokenContext';

interface FetchOptions extends RequestInit {
  body?: any;
}

export function useApi() {
  const { csrfToken, userToken } = useTokens();

  const fetchWithTokens = async (url: string, options: FetchOptions = {}) => {
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

    if (!response.ok) {
      throw response;
    }

    return response.json();
  };

  return { fetchWithTokens };
}
