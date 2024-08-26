import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { ApiEndpoints, PlaceTypes } from '../../constants';
import { useState } from 'react';
import { AddCircle, ChevronRightRounded } from '@mui/icons-material';
import { handleError } from '../../errors/handleError';
import { useApi } from '../../hooks/useApi';
import EventTitleInput from '../common/input/EventTitleInput';
import EventAddressInput from '../common/input/EventAddressInput';
import EventDescriptionInput from '../common/input/EventDescriptionInput';
import EventPlaceTypeInput from '../common/input/EventPlaceTypeInput';

interface CreateEventProps {
  setNewEventCreated: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateEvent: React.FC<CreateEventProps> = ({ setNewEventCreated }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    eventType: PlaceTypes.TEAM_BUILDING,
    address: '',
    description: '',
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
        setFormData({
          title: '',
          eventType: PlaceTypes.TEAM_BUILDING,
          address: '',
          description: '',
        });
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
              <EventTitleInput value={formData.title} onChange={handleChange} />
              <EventAddressInput
                value={formData.address}
                onChange={handleChange}
              />
              <EventDescriptionInput
                value={formData.description}
                onChange={handleChange}
              />
              <EventPlaceTypeInput
                value={formData.eventType}
                onChange={handleSelectChange}
              />
              {successMessage && (
                <Alert severity="success" sx={{ mb: 2, mt: 2 }}>
                  {successMessage}
                </Alert>
              )}
              {errorMessage && (
                <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
                  {errorMessage}
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '10px' }}
              >
                Submit
              </Button>
            </form>
          </AccordionDetails>
        )}
      </Accordion>
    </div>
  );
};

export default CreateEvent;
