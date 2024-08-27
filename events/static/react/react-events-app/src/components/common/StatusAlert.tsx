import React from 'react';
import { Alert } from '@mui/material';
import { StatusAlertProps } from '../../interfaces/types';

const StatusAlert: React.FC<StatusAlertProps> = ({ message, severity }) => {
  if (!message) return null;
  return (
    <Alert severity={severity} sx={{ mb: 2, mt: 2 }}>
      {message}
    </Alert>
  );
};

export default StatusAlert;
