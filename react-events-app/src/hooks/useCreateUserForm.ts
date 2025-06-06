import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MINIMUM_PASSWORD_LENGTH } from '../constants';
import { handleError } from '../errors/handleError';
import zxcvbn from 'zxcvbn';
import { useApi } from './useApi';
import { useAuth } from '../context/AuthContext';
import useAutoClearMessage from './useAutoClearMessage';
import { UseUserFormProps } from '../interfaces/hookTypes';

const useFormLogic = ({
  apiEndpoint,
  successMessageText,
  messageForBadRequest,
  method,
  loginPage,
}: UseUserFormProps) => {
  const [newUsername, setNewUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [email, setEmail] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const { setUserToken, loggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn && !user.isAdmin) {
      navigate('/');
    }
  }, [loggedIn, navigate, user]);

  useAutoClearMessage({
    message: successMessage,
    setMessage: setSuccessMessage,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (passwordFeedback) {
    //   setErrorMessage('Password is too weak. Please update and try again.');
    //   return;
    // }
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
        setNewUsername('');
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

  return {
    newUsername,
    setNewUsername,
    password,
    setPassword,
    passwordFeedback,
    setPasswordFeedback,
    email,
    setEmail,
    successMessage,
    errorMessage,
    handleSubmit,
    handlePasswordChange,
  };
};

export default useFormLogic;
