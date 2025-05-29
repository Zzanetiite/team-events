import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from './useApi';
import { useAuth } from '../context/AuthContext';
import { ApiEndpoints } from '../constants';
import { handleError } from '../errors/handleError';
import { UseLoginProps } from '../interfaces/hookTypes';

const useLogin = ({
  apiEndpoint,
  successMessageText,
  messageForBadRequest,
  method,
}: UseLoginProps) => {
  const [newUsername, setNewUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const { setUser, setUserToken, loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/myevents');
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    const fetchUsername = async () => {
      const data = await fetchWithTokens(ApiEndpoints.GET_USERNAME);
      setUser({
        username: data.username,
        isAdmin: data.is_admin || false,
        userId: data.id,
      });
    };

    if (loggedIn) {
      fetchUsername();
    }
  }, [fetchWithTokens, loggedIn, setUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetchWithTokens(apiEndpoint, {
        method: method || 'POST',
        body: JSON.stringify({
          username: newUsername,
          password: password,
        }),
      });

      if (response) {
        setSuccessMessage(successMessageText);
        setErrorMessage(null);
        setUserToken(response.token);
      }
    } catch (error: any) {
      handleError({
        error,
        setErrorMessage,
        setSuccessMessage,
        messageForBadRequest: messageForBadRequest,
      });
    }
  };

  return {
    newUsername,
    setNewUsername,
    password,
    setPassword,
    successMessage,
    errorMessage,
    handleSubmit,
  };
};

export default useLogin;
