import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { EventTableProps } from '../interfaces/types';
import { useApi } from './useApi';
import { eventEmptyData } from '../config';
import { ApiEndpoints } from '../constants';
import { handleError } from '../errors/handleError';
import useAutoClearMessage from './useAutoClearMessage';

export const useCreateEvent = (
  setNewEventCreated: (value: boolean) => void
) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState<EventTableProps>(eventEmptyData);
  const [submitClicked, setSubmitClicked] = useState(false);
  const { fetchWithTokens } = useApi();

  useAutoClearMessage({
    message: successMessage,
    setMessage: setSuccessMessage,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetchWithTokens(ApiEndpoints.CREATE_EVENT, {
        method: 'POST',
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          event_type: formData.eventType,
          address: formData.address,
        }),
      });

      if (response !== undefined && response !== null) {
        setSuccessMessage('Event created successfully!');
        setErrorMessage(null);
        setNewEventCreated(true);
        setFormData(eventEmptyData);
        setSubmitClicked(true);
      }
    } catch (error: any) {
      handleError({
        error,
        setErrorMessage,
        setSuccessMessage,
      });
    }
  };

  return {
    successMessage,
    errorMessage,
    expanded,
    formData,
    submitClicked,
    setSubmitClicked,
    setExpanded,
    handleChange,
    handleSelectChange,
    handleSubmit,
  };
};
