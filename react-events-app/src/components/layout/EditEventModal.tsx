import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { EditEventModalProps } from '../../interfaces/types';
import ConfirmAction from '../common/ConfirmAction';
import StatusAlert from '../common/StatusAlert';
import EventForm from '../common/event/EventForm';
import { useEditEventModal } from '../../hooks/useEditEventModal';
import EmptySubmitButton from '../common/buttons/EmptySubmitButton';
import EmptyCancelButton from '../common/buttons/EmptyCancelButton';
import EmptyDeleteButton from '../common/buttons/EmptyDeleteButton';

const EditEventModal = ({
  selectedEvent,
  open,
  handleClose,
  setModalUpdated,
  setDeleteSuccessMessage,
}: EditEventModalProps) => {
  const {
    event,
    errorMessage,
    successMessage,
    confirmOpen,
    setConfirmOpen,
    handleChange,
    handleSelectChange,
    handleLocationChange,
    handleSubmit,
    handleDelete,
  } = useEditEventModal({
    selectedEvent,
    setModalUpdated,
    setDeleteSuccessMessage,
    handleClose,
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm" // or "md", "lg"
      sx={{
        '& .MuiDialog-paper': {
          minHeight: 400, // or fixed height if needed
          minWidth: 500, // adjust as needed
        },
      }}
    >
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <EventForm
          data={event}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          handleLocationChange={handleLocationChange}
          loading={false}
        />
      </DialogContent>
      {errorMessage && <StatusAlert message={errorMessage} severity="error" />}
      {successMessage && (
        <StatusAlert message={successMessage} severity="success" />
      )}
      <DialogActions>
        <EmptyDeleteButton handleDelete={() => setConfirmOpen(true)} />
        <EmptyCancelButton handleClose={handleClose} text="Close" />
        <EmptySubmitButton handleSubmit={handleSubmit} />
      </DialogActions>
      <ConfirmAction
        confirmOpen={confirmOpen}
        setConfirmOpen={setConfirmOpen}
        handleDelete={handleDelete}
      />
    </Dialog>
  );
};

export default EditEventModal;
