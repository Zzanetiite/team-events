import React, { useEffect, useState } from 'react';
import EventTable from '../components/layout/EventTable';
import { useNavigate } from 'react-router-dom';
import { useTokens } from '../context/TokenContext';
import CreateEvent from '../components/layout/CreateEvent';
import { Box, CircularProgress } from '@mui/material';

const UserEvents = () => {
  const { loggedIn } = useTokens();
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);
  const [newEventCreated, setNewEventCreated] = useState(false);

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
        <CreateEvent setNewEventCreated={setNewEventCreated} />
      </Box>
      <Box marginTop={1} marginBottom={1}>
        <EventTable
          newEventCreated={newEventCreated}
          setNewEventCreated={setNewEventCreated}
        />
      </Box>
    </div>
  );
};

export default UserEvents;
