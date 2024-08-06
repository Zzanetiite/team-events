import { useCSRF } from '../context/CsrfContext';

interface FetchOptions extends RequestInit {
  body?: any;
}

const DOMAIN = 'https://team-events-cvm0.onrender.com';

export function useApi() {
  const { csrfToken } = useCSRF();

  const fetchWithCSRF = async (url: string, options: FetchOptions = {}) => {
    const headers: HeadersInit = {
      'X-CSRFToken': csrfToken || '',
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return { fetchWithCSRF };
}
