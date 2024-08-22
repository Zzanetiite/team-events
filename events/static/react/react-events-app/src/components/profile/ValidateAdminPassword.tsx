import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { CreateUserFormProps } from '../../interfaces/types';
import { ErrorMessages } from '../../constants';
import { useTokens } from '../../context/TokenContext';
import { handleError } from '../../errors/handleError';
import PasswordInput from '../common/PasswordInput';

const ValidateAdminPasswordForm: React.FC<CreateUserFormProps> = ({
  title,
  apiEndpoint,
  buttonText,
  successMessageText,
  method,
  adminPage,
}) => {
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const { loggedIn, setAdminPasswordValidated, adminPasswordValidated } =
    useTokens();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (adminPasswordValidated) {
      navigate('/createadmin');
    }
  }, [adminPage, adminPasswordValidated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetchWithTokens(apiEndpoint, {
        method: method ? method : 'POST',
        body: JSON.stringify({ password }),
      });
      console.log('Response:', response);

      if (response) {
        setSuccessMessage(successMessageText);
        setErrorMessage(null);
        setAdminPasswordValidated(true);
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
          <PasswordInput field={password} setField={setPassword} />
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: '120px' }}
          >
            {buttonText || 'Submit'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ValidateAdminPasswordForm;
