import { useEffect, useState } from 'react';
import { EditEventModalProps } from '../interfaces/types';
import { useApi } from './useApi';
import { ApiEndpoints, ErrorMessages } from '../constants';
import { mapUpdateEventToDBFormat } from '../utils/mapping';
import { handleError } from '../errors/handleError';
import useAutoClearMessage from './useAutoClearMessage';
import { useForm } from './useForm';

export const useEditEventModal = ({
  selectedEvent,
  setModalUpdated,
  setDeleteSuccessMessage,
  handleClose,
}: Omit<EditEventModalProps, 'open'>) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { fetchWithTokens } = useApi();
  const {
    event,
    setEvent,
    handleLocationChange,
    handleChange,
    handleSelectChange,
  } = useForm();

  useAutoClearMessage({
    message: successMessage,
    setMessage: setSuccessMessage,
  });

  useEffect(() => {
    if (selectedEvent) {
      setEvent(selectedEvent);
    }
  }, [selectedEvent, setEvent]);

  const handleSubmit = async () => {
    if (!event) return;
    try {
      const response = await fetchWithTokens(
        ApiEndpoints.UPDATE_OR_DELETE_EVENT(event.id),
        {
          method: 'PUT',
          body: JSON.stringify(mapUpdateEventToDBFormat(event)),
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
    event,
    setEvent,
    errorMessage,
    successMessage,
    confirmOpen,
    handleLocationChange,
    setConfirmOpen,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleDelete,
  };
};
