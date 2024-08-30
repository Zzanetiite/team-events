import React from 'react';
import { Typography } from '@mui/material';
import StatusAlert from './StatusAlert';

const EventTableHeader = ({
  deleteSuccessMessage,
  errorMessage,
}: {
  deleteSuccessMessage: string | null;
  errorMessage: string | null;
}) => {
  return (
    <>
      <Typography component="legend" variant="h5" gutterBottom>
        Events created by you
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
