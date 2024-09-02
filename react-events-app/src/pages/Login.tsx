import React from 'react';
import { Typography } from '@mui/material';
import FilledSubmitButton from '../components/common/buttons/FilledSubmitButton';
import StatusAlert from '../components/common/StatusAlert';
import UserFormBox from '../components/common/UserFormBox';
import UserInputInternalBox from '../components/common/UserInputInternalBox';
import { LoginPageProps } from '../interfaces/types';
import UsernameInput from '../components/common/input/UsernameInput';
import PasswordInput from '../components/common/input/PasswordInput';
import useLogin from '../hooks/useLogin';

const Login: React.FC<LoginPageProps> = ({
  title,
  apiEndpoint,
  successMessageText,
  messageForBadRequest,
  method,
}) => {
  const {
    newUsername,
    setNewUsername,
    password,
    setPassword,
    successMessage,
    errorMessage,
    handleSubmit,
  } = useLogin({
    apiEndpoint,
    successMessageText,
    messageForBadRequest,
    method,
  });

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
