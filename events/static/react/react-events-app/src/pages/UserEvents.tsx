import React, { useEffect, useState } from 'react';
import EventTable from '../components/common/EventTable';
import { useNavigate } from 'react-router-dom';
import { useTokens } from '../context/TokenContext';
import CreateEvent from '../components/layout/CreateEvent';
import { Box } from '@mui/material';

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

  if (!initialized) return <div>Loading...</div>; // TODO: Add loading spinner

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
