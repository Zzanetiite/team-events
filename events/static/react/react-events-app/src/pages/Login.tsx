import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FilledSubmitButton from '../components/common/buttons/FilledSubmitButton';
import StatusAlert from '../components/common/StatusAlert';
import UserFormBox from '../components/common/UserFormBox';
import UserInputInternalBox from '../components/common/UserInputInternalBox';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';
import { ApiEndpoints } from '../constants';
import { LoginPageProps } from '../interfaces/types';
import { handleError } from '../errors/handleError';
import UsernameInput from '../components/common/input/UsernameInput';
import PasswordInput from '../components/common/input/PasswordInput';

const Login: React.FC<LoginPageProps> = ({
  title,
  apiEndpoint,
  successMessageText,
  messageForBadRequest,
  method,
}) => {
  const [newUsername, setNewUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const { setUser, setUserToken, loggedIn, adminPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const data = await fetchWithTokens(ApiEndpoints.GET_USERNAME);
        setUser({
          username: data.username,
          isAdmin: data.is_admin || false,
          userId: data.id,
        });
      } catch (error) {}
    };

    if (loggedIn) {
      fetchUsername();
    }
  }, [fetchWithTokens, loggedIn, setUser]);

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

  return (
    <UserFormBox>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <UserInputInternalBox>
          <UsernameInput value={newUsername} onChange={setNewUsername} />
          <PasswordInput value={password} onChange={setPassword} />
          {successMessage && (
            <StatusAlert message={successMessage} severity="success" />
          )}
          {errorMessage && (
            <StatusAlert message={errorMessage} severity="error" />
          )}
          <FilledSubmitButton style={{ width: '120px' }} />
          <Typography variant="body2" gutterBottom>
            Sign up? <a href="/signup">Go to Sign Up</a>
          </Typography>
        </UserInputInternalBox>
      </form>
    </UserFormBox>
  );
};

export default Login;
