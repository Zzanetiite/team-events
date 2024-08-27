import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import { useApi } from '../../hooks/useApi';
import { EditEventModalProps, EventTableProps } from '../../interfaces/types';
import { ApiEndpoints, ErrorMessages, PlaceTypes } from '../../constants';
import { handleError } from '../../errors/handleError';
import { useTokens } from '../../context/TokenContext';
import ConfirmAction from '../common/ConfirmAction';
import StatusAlert from '../common/StatusAlert';
import EventForm from '../common/EventForm';
import { mapEventToDBFormat } from '../../utils/mapping';
import { eventEmptyData } from '../config';

const EditEventModal = ({
  open,
  handleClose,
  event,
  setModalUpdated,
  setDeleteSuccessMessage,
}: EditEventModalProps) => {
  const [eventData, setEventData] = useState<EventTableProps>(eventEmptyData);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { fetchWithTokens } = useApi();
  const { isAdmin } = useTokens();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 4000); // 4 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (open && event) {
      setEventData(event);
    }
  }, [open, event]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!event) return;
    console.log(eventData);
    try {
      const response = await fetchWithTokens(
        ApiEndpoints.UPDATE_OR_DELETE_EVENT(event.id),
        {
          method: 'PUT',
          body: JSON.stringify(mapEventToDBFormat(eventData)),
        }
      );
      if (response) {
        console.log('API response:', response);
        setErrorMessage(null);
        setSuccessMessage('Event updated successfully.');
        setModalUpdated(true);
      }
    } catch (error: any) {
      handleError({
        error,
        setErrorMessage,
        setSuccessMessage,
        messageForBadRequest: ErrorMessages.SERVER_ERROR,
      });
    }
  };

  const handleDelete = async () => {
    if (!event) return;
    console.log('Deleting: ', eventData);
    try {
      const response = await fetchWithTokens(
        ApiEndpoints.UPDATE_OR_DELETE_EVENT(event.id),
        {
          method: 'DELETE',
        }
      );
      if (response.deleted) {
        setDeleteSuccessMessage('Event deleted successfully.');
        setModalUpdated(true);
        handleClose();
      } else {
        throw new Error(
          'Failed to delete event. Server responded with an unexpected status.'
        );
      }
    } catch (error: any) {
      handleError({
        error,
        setErrorMessage,
        setSuccessMessage,
        messageForBadRequest: 'Error deleting event.',
      });
    }
  };

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
        {isAdmin && (
          <Button onClick={() => setConfirmOpen(true)} color="warning">
            Delete
          </Button>
        )}
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
