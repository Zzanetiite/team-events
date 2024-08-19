import React, { useEffect, useState } from 'react';
import { TextField, Box, Typography, Button, Alert } from '@mui/material';
import {
  Key as KeyIcon,
  Person as PersonIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { CreateUserFormProps } from '../../interfaces/types';
import { ErrorMessages } from '../../constants';
import { useTokens } from '../../context/TokenContext';

const UserForm: React.FC<CreateUserFormProps> = ({
  title,
  apiEndpoint,
  buttonText,
  successMessageText,
  method,
  hasEmail,
  loginPage,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const { userToken, setUserToken, loggedIn } = useTokens();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody: { username: string; password: string; email?: string } =
      {
        username,
        password,
      };

    if (hasEmail) {
      requestBody.email = email;
    }

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
      if (error.status === 409) {
        setErrorMessage(ErrorMessages.BAD_REQUEST);
      }
      if (error.status === 401) {
        setErrorMessage(ErrorMessages.UNAUTHORIZED);
      }
      if (error.status === 404) {
        setErrorMessage(ErrorMessages.NOT_FOUND);
      }
      if (error.status === 409) {
        setErrorMessage(ErrorMessages.USER_EXISTS);
      }
      if (error.status === 500) {
        setErrorMessage(ErrorMessages.SERVER_ERROR);
      }
      setSuccessMessage(null);
    }
    if (loginPage) {
      console.log('User token:', userToken);
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
          <Box display="flex" alignItems="center">
            <PersonIcon style={{ marginRight: '10px' }} />
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>
          <Box display="flex" alignItems="center">
            <KeyIcon style={{ marginRight: '10px' }} />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          {hasEmail && (
            <Box display="flex" alignItems="center">
              <EmailIcon style={{ marginRight: '10px' }} />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
          )}
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
