import { useEffect, useState } from 'react';
import { useApi } from './useApi';
import { eventEmptyData } from '../config';
import { ApiEndpoints, ErrorMessages } from '../constants';
import { handleError } from '../errors/handleError';
import useAutoClearMessage from './useAutoClearMessage';
import { useForm } from './useForm';
import {
  mapCreateEventToDBFormat,
  mapUpdateEventToDBFormat,
} from '../utils/mapping';
import { EventProps } from '../interfaces/types';
import { useDataContext } from '../context/DataContext';

export const useCreateEvent = (
  setNewEventCreated: (value: boolean) => void,
  selectedEvent: EventProps | null
) => {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchWithTokens } = useApi();
  const {
    event,
    setEvent,
    handleLocationChange,
    handleChange,
    handleSelectChange,
  } = useForm();
  const { setFormAddress, setFormCoordinates } = useDataContext();

  useEffect(() => {
    if (selectedEvent) {
      setEvent(() => selectedEvent);
      setFormCoordinates(selectedEvent.location.location);
      setFormAddress(selectedEvent.location.address);
    }
  }, [setFormAddress, setEvent, setFormCoordinates, selectedEvent]);

  useAutoClearMessage({
    message: successMessage,
    setMessage: setSuccessMessage,
  });

  useAutoClearMessage({
    message: errorMessage,
    setMessage: setErrorMessage,
  });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetchWithTokens(ApiEndpoints.CREATE_EVENT, {
        method: 'POST',
        body: JSON.stringify(mapCreateEventToDBFormat(event)),
      });

      if (response !== undefined && response !== null) {
        setSuccessMessage('Event created successfully!');
        setErrorMessage(null);
        setNewEventCreated(true);
        setEvent(() => eventEmptyData);
        setSubmitClicked(true);
      }
    } catch (error: any) {
      handleError({
        error,
        setErrorMessage,
        setSuccessMessage,
      });
    }
    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
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
        setSuccessMessage('Event updated successfully.');
        setErrorMessage(null);
        setNewEventCreated(true);
        setEvent(() => eventEmptyData);
        setSubmitClicked(true);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    if (submitter?.name === 'create') {
      handleCreate(e);
    } else if (submitter?.name === 'update') {
      handleUpdate(e);
    }
  };

  return {
    successMessage,
    errorMessage,
    event,
    submitClicked,
    setSubmitClicked,
    handleChange,
    handleSelectChange,
    handleLocationChange,
    handleSubmit,
    loading,
  };
};
