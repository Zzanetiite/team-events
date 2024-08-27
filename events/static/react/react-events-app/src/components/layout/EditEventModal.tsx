import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import { useApi } from '../../hooks/useApi';
import { EditEventModalProps, EventTableProps } from '../../interfaces/types';
import { ApiEndpoints, ErrorMessages, PlaceTypes } from '../../constants';
import { handleError } from '../../errors/handleError';
import EventTitleInput from '../common/input/EventTitleInput';
import EventAddressInput from '../common/input/EventAddressInput';
import EventDescriptionInput from '../common/input/EventDescriptionInput';
import EventPlaceTypeInput from '../common/input/EventPlaceTypeInput';
import { useTokens } from '../../context/TokenContext';
import ConfirmAction from '../common/ConfirmAction';

const EditEventModal = ({
  open,
  handleClose,
  event,
  setModalUpdated,
  setDeleteSuccessMessage,
}: EditEventModalProps) => {
  const [eventData, setEventData] = useState<EventTableProps>({
    id: 0,
    title: '',
    eventType: PlaceTypes.TEAM_BUILDING,
    address: '',
    description: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { fetchWithTokens } = useApi();
  const { isAdmin } = useTokens();

  // Automatically hide success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 4000); // 2 seconds

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
        ApiEndpoints.UPDATE_EVENT(event.id),
        {
          method: 'PUT',
          body: JSON.stringify({
            id: eventData.id,
            title: eventData.title,
            event_type: eventData.eventType,
            description: eventData.description,
          }),
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
        ApiEndpoints.UPDATE_EVENT(event.id),
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
        <EventTitleInput value={eventData.title} onChange={handleChange} />
        <EventAddressInput value={eventData.address} onChange={handleChange} />
        <EventDescriptionInput
          value={eventData.description}
          onChange={handleChange}
        />
        <EventPlaceTypeInput
          value={eventData.eventType}
          onChange={handleSelectChange}
        />
      </DialogContent>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
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
