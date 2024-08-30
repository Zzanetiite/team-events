import { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { EditEventModalProps, EventTableProps } from '../interfaces/types';
import { eventEmptyData } from '../config';
import { useApi } from './useApi';
import { ApiEndpoints, ErrorMessages } from '../constants';
import { mapEventToDBFormat } from '../utils/mapping';
import { handleError } from '../errors/handleError';

export const useEditEventModal = ({
  event,
  setModalUpdated,
  setDeleteSuccessMessage,
  handleClose,
}: Omit<EditEventModalProps, 'open'>) => {
  const [eventData, setEventData] = useState<EventTableProps>(eventEmptyData);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { fetchWithTokens } = useApi();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 4000); // 4 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (event) {
      setEventData(event);
    }
  }, [event]);

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
    try {
      const response = await fetchWithTokens(
        ApiEndpoints.UPDATE_OR_DELETE_EVENT(event.id),
        {
          method: 'PUT',
          body: JSON.stringify(mapEventToDBFormat(eventData)),
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

  const handleDelete = async () => {
    if (!event) return;
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

  return {
    eventData,
    errorMessage,
    successMessage,
    confirmOpen,
    setConfirmOpen,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleDelete,
  };
};
