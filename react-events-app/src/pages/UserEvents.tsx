import React, { useEffect, useState } from 'react';
import EventTable from '../components/layout/EventTable';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CreateEvent from '../components/layout/CreateEvent';
import { Box, CircularProgress, Divider } from '@mui/material';
import { EventProps } from '../interfaces/types';

const UserEvents = () => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);
  const [newEventCreated, setNewEventCreated] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null);

  useEffect(() => {
    if (loggedIn !== null) {
      setInitialized(true);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (initialized && !loggedIn) {
      navigate('/login');
    }
  }, [initialized, loggedIn, navigate]);

  if (!initialized)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <div>
      <Box marginTop={1} marginBottom={1}>
        <EventTable
          newEventCreated={newEventCreated}
          setNewEventCreated={setNewEventCreated}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      </Box>
      <Divider />
      <Box marginTop={1} marginBottom={1}>
        <CreateEvent
          selectedEvent={selectedEvent}
          setNewEventCreated={setNewEventCreated}
        />
      </Box>
    </div>
  );
};

export default UserEvents;
