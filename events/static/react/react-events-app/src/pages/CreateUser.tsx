import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CreateUserFormProps } from '../interfaces/types';
import { useApi } from '../hooks/useApi';
import { useTokens } from '../context/TokenContext';
import { ApiEndpoints, MINIMUM_PASSWORD_LENGTH } from '../constants';
import { handleError } from '../errors/handleError';
import zxcvbn from 'zxcvbn';
import UsernameInput from '../components/common/input/UsernameInput';
import PasswordInputValidated from '../components/common/input/PasswordInputValidated';
import PasswordFeedback from '../components/common/input/PasswordFeedback';
import EmailInput from '../components/common/input/EmailInput';
import UserFormBox from '../components/common/UserFormBox';
import UserInputInternalBox from '../components/common/UserInputInternalBox';
import FilledSubmitButton from '../components/common/buttons/FilledSubmitButton';
import StatusAlert from '../components/common/StatusAlert';

const CreateUser: React.FC<CreateUserFormProps> = ({
  title,
  apiEndpoint,
  successMessageText,
  messageForBadRequest,
  method,
  loginPage,
  adminPage,
}) => {
  const [newUsername, setNewUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [email, setEmail] = useState<string>('');
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
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

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

    if (passwordFeedback) {
      setErrorMessage('Password is too weak. Please update and try again.');
      return;
    }
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < MINIMUM_PASSWORD_LENGTH) {
      setPasswordFeedback(
        `Password must be at least ${MINIMUM_PASSWORD_LENGTH} characters long.`
      );
      return;
    }
    const result = zxcvbn(newPassword);
    setPasswordFeedback(result.feedback.suggestions.join(' '));
  };

  return (
    <UserFormBox>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <UserInputInternalBox>
          <UsernameInput value={newUsername} onChange={setNewUsername} />
          <PasswordInputValidated
            value={password}
            onChange={handlePasswordChange}
            feedback={passwordFeedback}
          />
          {passwordFeedback && <PasswordFeedback feedback={passwordFeedback} />}
          {adminPage && <EmailInput value={email} onChange={setEmail} />}
          {successMessage && (
            <StatusAlert message={successMessage} severity="success" />
          )}
          {errorMessage && (
            <StatusAlert message={errorMessage} severity="error" />
          )}
          <FilledSubmitButton style={{ width: '120px' }} />
        </UserInputInternalBox>
      </form>
    </UserFormBox>
  );
};

export default CreateUser;
