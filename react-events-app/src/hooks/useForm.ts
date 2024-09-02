import { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { EventProps, LocationProps } from '../interfaces/types';
import { eventEmptyData } from '../config';

export const useForm = () => {
  const [event, setEvent] = useState<EventProps>(eventEmptyData);

  useEffect(() => {
    if (event) {
      setEvent(event);
    }
  }, [event]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (location: LocationProps) => {
    setEvent((prev) => ({
      ...prev,
      location: location,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    event,
    setEvent,
    handleLocationChange,
    handleChange,
    handleSelectChange,
  };
};
