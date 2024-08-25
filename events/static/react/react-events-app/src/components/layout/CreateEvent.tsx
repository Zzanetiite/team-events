import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ApiEndpoints, PlaceTypes } from '../../constants';
import { useState } from 'react';
import { AddCircle, ChevronRightRounded } from '@mui/icons-material';
import { handleError } from '../../errors/handleError';
import { useApi } from '../../hooks/useApi';

const CreateEvent = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    eventType: '',
    address: '',
    description: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form Data:', formData);
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
        <AccordionDetails>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              required
            />
            <Select
              label="Place Type"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Select place type</em>
              </MenuItem>
              {Object.values(PlaceTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
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
              style={{ marginTop: '1px' }}
            >
              Submit
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CreateEvent;
