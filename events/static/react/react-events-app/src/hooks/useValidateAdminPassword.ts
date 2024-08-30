import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from './useApi';
import { useAuth } from '../context/AuthContext';
import { handleError } from '../errors/handleError';
import { ErrorMessages } from '../constants';
import { useValidateAdminPasswordProps } from '../interfaces/hookTypes';

const useValidateAdminPassword = ({
  apiEndpoint,
  successMessageText,
  adminPage,
}: useValidateAdminPasswordProps) => {
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const { loggedIn, setAdminPassword, adminPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (adminPassword && !errorMessage) {
      navigate('/createadmin');
    }
  }, [adminPage, adminPassword, errorMessage, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetchWithTokens(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify({ password: password }),
      });

      if (response) {
        setSuccessMessage(successMessageText);
        setErrorMessage(null);
        setAdminPassword(password);
      }
    } catch (error: any) {
      handleError({
        error,
        setErrorMessage,
        setSuccessMessage,
        messageForBadRequest: ErrorMessages.INVALID_CREDENTIALS,
        overrideErrorHandlers: {
          403: (setErrorMessage) => {
            setErrorMessage('Password wrong.');
          },
        },
      });
    }
  };

  return {
    password,
    setPassword,
    successMessage,
    errorMessage,
    handleSubmit,
  };
};

export default useValidateAdminPassword;
