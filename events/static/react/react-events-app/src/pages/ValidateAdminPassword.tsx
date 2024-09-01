import React from 'react';
import { Box, Typography } from '@mui/material';
import PasswordInput from '../components/common/input/PasswordInput';
import StatusAlert from '../components/common/StatusAlert';
import FilledSubmitButton from '../components/common/buttons/FilledSubmitButton';
import useValidateAdminPassword from '../hooks/useValidateAdminPassword';
import { ValidatePasswordProps } from '../interfaces/types';

const ValidateAdminPasswordForm: React.FC<ValidatePasswordProps> = ({
  title,
  successMessageText,
}) => {
  const { password, setPassword, successMessage, errorMessage, handleSubmit } =
    useValidateAdminPassword({
      successMessageText,
    });

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
