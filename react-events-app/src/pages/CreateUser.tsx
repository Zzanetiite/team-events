import React from 'react';
import { Typography } from '@mui/material';
import { CreateUserFormProps } from '../interfaces/types';
import UsernameInput from '../components/common/input/UsernameInput';
import PasswordInputValidated from '../components/common/input/PasswordInputValidated';
import EmailInput from '../components/common/input/EmailInput';
import UserFormBox from '../components/base/UserFormBox';
import UserInputInternalBox from '../components/base/UserInputInternalBox';
import FilledSubmitButton from '../components/common/buttons/FilledSubmitButton';
import StatusAlert from '../components/common/StatusAlert';
import useCreateUserForm from '../hooks/useCreateUserForm';
import PasswordFeedback from '../components/common/input/PasswordFeedback';

const CreateUser: React.FC<CreateUserFormProps> = ({
  title,
  apiEndpoint,
  successMessageText,
  messageForBadRequest,
  method,
  loginPage,
  adminPage,
}) => {
  const {
    newUsername,
    setNewUsername,
    password,
    handlePasswordChange,
    passwordFeedback,
    email,
    setEmail,
    successMessage,
    errorMessage,
    handleSubmit,
  } = useCreateUserForm({
    title,
    apiEndpoint,
    successMessageText,
    messageForBadRequest,
    method,
    loginPage,
    adminPage,
  });

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
