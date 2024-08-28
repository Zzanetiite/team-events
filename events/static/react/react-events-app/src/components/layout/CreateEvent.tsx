import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { ApiEndpoints } from '../../constants';
import { useState } from 'react';
import { AddCircle, ChevronRightRounded } from '@mui/icons-material';
import { handleError } from '../../errors/handleError';
import { useApi } from '../../hooks/useApi';
import StatusAlert from '../common/StatusAlert';
import EventForm from '../common/EventForm';
import { EventTableProps } from '../../interfaces/types';
import FilledSubmitButton from '../common/buttons/FilledSubmitButton';
import { eventEmptyData } from '../../config';

interface CreateEventProps {
  setNewEventCreated: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateEvent: React.FC<CreateEventProps> = ({ setNewEventCreated }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState<EventTableProps>(eventEmptyData);

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

  return (
    <div>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<ChevronRightRounded sx={{ color: 'primary.main' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-left',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1,
              padding: 0,
            }}
          >
            <AddCircle sx={{ color: 'primary.main', fontSize: '24px' }} />
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Create a new event?
            </Typography>
          </Box>
        </AccordionSummary>
        {expanded && (
          <AccordionDetails>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <EventForm
                data={formData}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
              />
              {successMessage && (
                <StatusAlert message={successMessage} severity="success" />
              )}
              {errorMessage && (
                <StatusAlert message={errorMessage} severity="error" />
              )}
              <FilledSubmitButton style={{ marginTop: '10px' }} />
            </form>
          </AccordionDetails>
        )}
      </Accordion>
    </div>
  );
};

export default CreateEvent;
