import React, { useState } from 'react';
import { Alert } from '@mui/material';
import { StatusAlertProps } from '../../interfaces/types';

const StatusAlert: React.FC<StatusAlertProps> = ({ message, severity }) => {
  const [open, setOpen] = useState(true);

  if (!message || !open) return null;

  return (
    <Alert
      severity={severity}
      onClose={() => setOpen(false)}
      sx={{ mb: 2, mt: 2 }}
    >
      {message}
    </Alert>
  );
};

export default StatusAlert;
