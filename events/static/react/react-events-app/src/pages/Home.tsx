import React, { useEffect, useMemo, useState } from 'react';
import { Container, Grid } from '@mui/material';
import Event from '../components/layout/Event';
import CounterButton from '../components/common/CounterButton';
import { ApiEndpoints, PlaceTypes } from '../constants';
import { useApi } from '../hooks/useApi';
import { EventDBProps, EventProps } from '../interfaces/types';
import { useDataContext } from '../context/DataContext';

const Home = () => {
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
        console.error('Error fetching Latest Event data:', error)
      );
  }, [setEventData]);

  const mapEventData = (apiData: EventDBProps[]): EventProps[] => {
    return apiData.map((event) => ({
      eventTitle: event.title,
      placeType: mapEventTypeToPlaceType(event.event_type.name),
      address: '123 Main St',
      description: event.description,
      comments: [
        'Short comment!',
        'Great service. A lovely place to eat and hang out with friends. Great ambiance and food!',
        'Will visit again! A lovely place to eat and hang out with friends. Great ambiance and food!',
      ],
      placeRating: event.average_rating || 4.5,
      loudnessRating: 3,
    }));
  };

  const mapEventTypeToPlaceType = (eventTypeName: string): PlaceTypes => {
    const placeType = Object.values(PlaceTypes).find(
      (type) => type === eventTypeName
    );
    return placeType || PlaceTypes.TEAM_BUILDING;
  };

  return (
    <div>
      <CounterButton counterId={2} />
      <Container maxWidth="lg" sx={{ paddingX: 1 }}>
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
