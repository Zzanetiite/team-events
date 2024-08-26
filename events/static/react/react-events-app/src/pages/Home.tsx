import React, { useEffect, useState } from 'react';
import { Alert, Container, Grid } from '@mui/material';
import Event from '../components/layout/Event';
import { ApiEndpoints } from '../constants';
import { useApi } from '../hooks/useApi';
import { EventDBProps } from '../interfaces/types';
import { useDataContext } from '../context/DataContext';
import { mapEventData } from '../utils/mapping';

const Home = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const { eventData, setEventData } = useDataContext();

  useEffect(() => {
    fetchWithTokens(ApiEndpoints.GET_LATEST_EVENTS, { method: 'GET' })
      .then((data: EventDBProps[]) => {
        console.log('Fetched Event Data:', data);
        const mappedEvents = mapEventData(data);
        setEventData(mappedEvents);
      })
      .catch((error: any) =>
        setErrorMessage(
          'Error loading Event data. Apologies for the inconvenince.'
        )
      );
  }, [setEventData]);

  return (
    <div>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Container
        maxWidth="lg"
        sx={{ paddingX: 1, marginTop: 3, marginBottom: 3 }}
      >
        <Grid container spacing={2}>
          {eventData.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Event {...event} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
