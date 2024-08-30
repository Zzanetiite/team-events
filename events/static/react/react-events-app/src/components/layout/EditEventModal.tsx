import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import { EditEventModalProps } from '../../interfaces/types';
import ConfirmAction from '../common/ConfirmAction';
import StatusAlert from '../common/StatusAlert';
import EventForm from '../common/EventForm';
import { useEditEventModal } from '../../hooks/useEditEventModal';

const EditEventModal = ({
  open,
  handleClose,
  event,
  setModalUpdated,
  setDeleteSuccessMessage,
}: EditEventModalProps) => {
  const {
    eventData,
    errorMessage,
    successMessage,
    confirmOpen,
    setConfirmOpen,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleDelete,
  } = useEditEventModal({
    event,
    setModalUpdated,
    setDeleteSuccessMessage,
    handleClose,
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-modal={true}
      aria-hidden={false}
    >
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <EventForm
          data={eventData}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
        />
      </DialogContent>
      {errorMessage && <StatusAlert message={errorMessage} severity="error" />}
      {successMessage && (
        <StatusAlert message={successMessage} severity="success" />
      )}
      <DialogActions>
        <Button onClick={() => setConfirmOpen(true)} color="warning">
          Delete
        </Button>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
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
