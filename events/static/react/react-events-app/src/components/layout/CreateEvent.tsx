import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { PlaceTypes } from '../../constants';
import { useState } from 'react';
import { AddCircle, ChevronRightRounded } from '@mui/icons-material';

const CreateEvent = () => {
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    eventTitle: '',
    placeType: '',
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO: Handle form submission logic here
    console.log('Form Data:', formData);
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
            alignItems: 'center', // Vertically center items
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
              name="eventTitle"
              value={formData.eventTitle}
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
              name="placeType"
              value={formData.placeType}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            >
              <MenuItem value="">
                <em>Select place type</em>
              </MenuItem>
              {Object.values(PlaceTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '16px' }}
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
