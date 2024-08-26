import React, {
  useState,
  useEffect,
  ChangeEvent,
  SetStateAction,
  Dispatch,
} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import { useApi } from '../../hooks/useApi';
import { EventTableProps } from '../../interfaces/types';
import { ApiEndpoints, ErrorMessages, PlaceTypes } from '../../constants';
import { handleError } from '../../errors/handleError';
import EventTitleInput from '../common/input/EventTitleInput';
import EventAddressInput from '../common/input/EventAddressInput';
import EventDescriptionInput from '../common/input/EventDescriptionInput';
import EventPlaceTypeInput from '../common/input/EventPlaceTypeInput';

interface EditEventModalProps {
  open: boolean;
  handleClose: () => void;
  event: EventTableProps | null;
  setModalUpdated: Dispatch<SetStateAction<boolean>>;
}

const EditEventModal = ({
  open,
  handleClose,
  event,
  setModalUpdated,
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
  const { fetchWithTokens } = useApi();

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
            id: event.id,
            title: event.title,
            event_type: event.eventType,
            description: event.description,
          }),
        }
      );

      if (response) {
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

  return (
    <Dialog open={open} onClose={handleClose}>
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
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEventModal;
