import { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { EventTableProps } from '../interfaces/types';
import { useApi } from './useApi';
import { eventEmptyData } from '../config';
import { ApiEndpoints } from '../constants';
import { handleError } from '../errors/handleError';

export const useCreateEvent = (
  setNewEventCreated: (value: boolean) => void
) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState<EventTableProps>(eventEmptyData);
  const { fetchWithTokens } = useApi();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 4000); // 4 seconds

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

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
    setExpanded,
    handleChange,
    handleSelectChange,
    handleSubmit,
  };
};
