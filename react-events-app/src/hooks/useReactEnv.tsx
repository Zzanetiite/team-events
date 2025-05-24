import { useEffect, useState } from 'react';
import { ApiEndpoints } from '../constants';
import { useApi } from './useApi';

interface ReactEnvVars {
  REACT_APP_DOMAIN: string;
  REACT_APP_GOOGLE_MAPS_API_KEY: string;
}

export const useReactEnv = () => {
  const { fetchWithTokens } = useApi();
  const [envVars, setEnvVars] = useState<ReactEnvVars | undefined>(undefined);

  useEffect(() => {
    fetchWithTokens(ApiEndpoints.GET_REACT_ENV, { method: 'GET' })
      .then((data: ReactEnvVars) => {
        setEnvVars(data);
      })
      .catch((error) => {
        console.error('Failed to fetch React env vars:', error);
      });
  }, [fetchWithTokens]);

  return { envVars };
};
