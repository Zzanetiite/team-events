import { useState } from 'react';
import { useApi } from './useApi';
import { eventEmptyData } from '../config';
import { ApiEndpoints } from '../constants';
import { handleError } from '../errors/handleError';
import useAutoClearMessage from './useAutoClearMessage';
import { useForm } from './useForm';
import { mapCreateEventToDBFormat } from '../utils/mapping';

export const useCreateEvent = (
  setNewEventCreated: (value: boolean) => void
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

  useAutoClearMessage({
    message: successMessage,
    setMessage: setSuccessMessage,
  });

  useAutoClearMessage({
    message: errorMessage,
    setMessage: setErrorMessage,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
