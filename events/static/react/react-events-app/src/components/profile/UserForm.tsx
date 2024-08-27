import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { CreateUserFormProps } from '../../interfaces/types';
import { useTokens } from '../../context/TokenContext';
import PasswordInput from '../common/input/PasswordInput';
import UsernameInput from '../common/input/UsernameInput';
import EmailInput from '../common/input/EmailInput';
import { handleError } from '../../errors/handleError';
import { ApiEndpoints } from '../../constants';

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
  const [newUsername, setNewUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const {
    username,
    setUserToken,
    setUsername,
    loggedIn,
    adminPassword,
    setIsAdmin,
  } = useTokens();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (adminPage && !adminPassword) {
      navigate('/validateadmin');
    }
  }, [adminPage, adminPassword, navigate]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const data = await fetchWithTokens(ApiEndpoints.GET_USERNAME);
        setUsername(data.username);
        if (data.is_admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {}
    };

    if (loggedIn) {
      fetchUsername();
    } else {
      setUsername('');
    }
  }, [fetchWithTokens, loggedIn, setIsAdmin, setUsername, username]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetchWithTokens(apiEndpoint, {
        method: method ? method : 'POST',
        body: JSON.stringify({
          username: newUsername,
          password: password,
          secret_admin_password: adminPassword,
        }),
      });

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
          <UsernameInput value={newUsername} onChange={setNewUsername} />
          <PasswordInput value={password} onChange={setPassword} />
          {adminPage && <EmailInput value={email} onChange={setEmail} />}
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
          {loginPage && (
            <Typography variant="body2" gutterBottom>
              Sign up? <a href="/signup">Go to Sign Up</a>
            </Typography>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default UserForm;
