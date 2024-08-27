import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Alert, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { CreateUserFormProps } from '../interfaces/types';
import { ErrorMessages } from '../constants';
import { useTokens } from '../context/TokenContext';
import { handleError } from '../errors/handleError';
import PasswordInput from '../components/common/input/PasswordInput';
import StatusAlert from '../components/common/StatusAlert';
import FilledSubmitButton from '../components/common/FilledSubmitButton';

const ValidateAdminPasswordForm: React.FC<CreateUserFormProps> = ({
  title,
  apiEndpoint,
  successMessageText,
  method,
  adminPage,
}) => {
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const { loggedIn, setAdminPassword, adminPassword } = useTokens();
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
        method: method ? method : 'POST',
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

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          alignItems="center"
          height="50vh"
        >
          <PasswordInput value={password} onChange={setPassword} />
          {successMessage && (
            <StatusAlert message={successMessage} severity="success" />
          )}
          {errorMessage && (
            <StatusAlert message={errorMessage} severity="error" />
          )}
          <FilledSubmitButton />
        </Box>
      </form>
    </Box>
  );
};

export default ValidateAdminPasswordForm;
