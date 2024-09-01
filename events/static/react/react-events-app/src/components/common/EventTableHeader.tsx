import React from 'react';
import { Typography } from '@mui/material';
import StatusAlert from './StatusAlert';
import { useAuth } from '../../context/AuthContext';

const EventTableHeader = ({
  deleteSuccessMessage,
  errorMessage,
}: {
  deleteSuccessMessage: string | null;
  errorMessage: string | null;
}) => {
  const { user } = useAuth();
  const heading = user.isAdmin ? 'All User Events' : 'Events created by you';
  console.log(user);
  return (
    <>
      <Typography component="legend" variant="h5" gutterBottom>
        {heading}
      </Typography>
      <Typography component="legend" variant="body2" gutterBottom>
        Click on an event to edit it.
      </Typography>
      {deleteSuccessMessage && (
        <StatusAlert message={deleteSuccessMessage} severity="success" />
      )}
      {errorMessage && <StatusAlert message={errorMessage} severity="error" />}
    </>
  );
};

export default EventTableHeader;
