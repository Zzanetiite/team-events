import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { AddCircle, ChevronRightRounded } from '@mui/icons-material';
import StatusAlert from '../common/StatusAlert';
import EventForm from '../common/EventForm';
import { CreateEventProps } from '../../interfaces/types';
import FilledSubmitButton from '../common/buttons/FilledSubmitButton';
import { useCreateEvent } from '../../hooks/useCreateEvent';
import { CHAR_LIMITS } from '../../constants/EventConstants';

const CreateEvent: React.FC<CreateEventProps> = ({ setNewEventCreated }) => {
  const {
    successMessage,
    errorMessage,
    expanded,
    event,
    submitClicked,
    setSubmitClicked,
    setExpanded,
    handleChange,
    handleSelectChange,
    handleLocationChange,
    handleSubmit,
  } = useCreateEvent(setNewEventCreated);

  const invalidTextLength: boolean =
    event.description.length >= CHAR_LIMITS.EventDescriptionMax ||
    event.eventTitle.length >= CHAR_LIMITS.EventTitleMax ||
    event.eventTitle.length <= CHAR_LIMITS.EventTitleMin ||
    event.description.length <= CHAR_LIMITS.EventDescriptionMin;
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
                data={event}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                handleLocationChange={handleLocationChange}
                submitClicked={submitClicked}
                setSubmitClicked={setSubmitClicked}
              />
              {successMessage && (
                <StatusAlert message={successMessage} severity="success" />
              )}
              {errorMessage && (
                <StatusAlert message={errorMessage} severity="error" />
              )}
              <FilledSubmitButton
                style={{ marginTop: '10px' }}
                disabled={invalidTextLength}
              />
            </form>
          </AccordionDetails>
        )}
      </Accordion>
    </div>
  );
};

export default CreateEvent;
