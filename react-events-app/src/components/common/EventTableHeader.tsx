import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import StatusAlert from './StatusAlert';
import { useAuth } from '../../context/AuthContext';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import ConfirmAction from './ConfirmAction';

const EventTableHeader = ({
  deleteSuccessMessage,
  errorMessage,
  selectionModel,
  handleBulkDelete,
}: {
  deleteSuccessMessage: string | null;
  errorMessage: string | null;
  selectionModel: GridRowSelectionModel;
  handleBulkDelete: () => void;
}) => {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const { user } = useAuth();

  const heading = user.isAdmin ? 'All User Events' : 'Events created by you';
  const selectedLength = selectionModel.ids.size;

  return (
    <>
      <Typography component="legend" variant="h5" gutterBottom>
        {heading}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          mb: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: 'primary.main' }}>
          Click on an event to edit it and use the form below to make changes
        </Typography>

        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => setConfirmOpen(true)}
          disabled={selectedLength === 0}
        >
          Delete All Selected ({selectedLength})
        </Button>
      </Box>
      {deleteSuccessMessage && (
        <StatusAlert message={deleteSuccessMessage} severity="success" />
      )}
      {errorMessage && <StatusAlert message={errorMessage} severity="error" />}
      {/* Confirmation Modal */}
      <ConfirmAction
        confirmOpen={confirmOpen}
        setConfirmOpen={setConfirmOpen}
        handleDelete={handleBulkDelete}
        title="Delete Selected Events"
        description={`Are you sure you want to delete ${selectedLength} selected event(s)? This action cannot be undone.`}
      />
    </>
  );
};

export default EventTableHeader;
