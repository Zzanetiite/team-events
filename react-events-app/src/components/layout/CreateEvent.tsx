import React from 'react';
import { Box, Typography } from '@mui/material';
import StatusAlert from '../common/StatusAlert';
import EventForm from '../common/event/EventForm';
import { CreateEventProps } from '../../interfaces/types';
import FilledSubmitButton from '../common/buttons/FilledSubmitButton';
import { useCreateEvent } from '../../hooks/useCreateEvent';
import { CHAR_LIMITS } from '../../constants/EventConstants';

const CreateEvent: React.FC<CreateEventProps> = ({ setNewEventCreated }) => {
  const {
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
  } = useCreateEvent(setNewEventCreated);

  const invalidTextLength: boolean =
    event.description.length >= CHAR_LIMITS.EventDescriptionMax ||
    event.eventTitle.length >= CHAR_LIMITS.EventTitleMax ||
    event.eventTitle.length <= CHAR_LIMITS.EventTitleMin ||
    event.description.length <= CHAR_LIMITS.EventDescriptionMin;
  return (
    <Box padding={2}>
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
        <Typography variant="h5" sx={{ color: 'text.primary' }}>
          Create a new event
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <EventForm
          data={event}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          handleLocationChange={handleLocationChange}
          submitClicked={submitClicked}
          setSubmitClicked={setSubmitClicked}
          loading={loading}
        />
        {successMessage && (
          <StatusAlert message={successMessage} severity="success" />
        )}
        {errorMessage && (
          <StatusAlert message={errorMessage} severity="error" />
        )}
        <FilledSubmitButton
          style={{ marginTop: '10px' }}
          disabled={invalidTextLength || loading}
        />
      </form>
    </Box>
  );
};

export default CreateEvent;
