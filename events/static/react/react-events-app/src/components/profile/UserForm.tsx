import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { CreateUserFormProps } from '../../interfaces/types';
import { useTokens } from '../../context/TokenContext';
import PasswordInput from '../common/PasswordInput';
import UsernameInput from '../common/UsernameInput';
import EmailInput from '../common/EmailInput';
import { handleError } from '../../errors/handleError';

const UserForm: React.FC<CreateUserFormProps> = ({
  title,
  apiEndpoint,
  buttonText,
  successMessageText,
  messageForBadRequest,
  method,
  loginPage,
  adminPage,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const { setUserToken, loggedIn, adminPasswordValidated } = useTokens();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (adminPage && !adminPasswordValidated) {
      navigate('/validateadmin');
    }
  }, [adminPage, adminPasswordValidated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetchWithTokens(apiEndpoint, {
        method: method ? method : 'POST',
        body: JSON.stringify({ username, password }),
      });
      console.log('Response:', response);

      if (response) {
        setSuccessMessage(successMessageText);
        setErrorMessage(null);
        setUsername('');
        setPassword('');
        setEmail('');
        if (loginPage) {
          setUserToken(response.token);
        }
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
          <UsernameInput field={username} setField={setUsername} />
          <PasswordInput field={password} setField={setPassword} />
          {adminPage && <EmailInput field={email} setField={setEmail} />}
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

export default UserForm;
