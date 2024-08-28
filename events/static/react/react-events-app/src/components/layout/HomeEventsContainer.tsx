import React from 'react';
import { Container, Grid } from '@mui/material';
import Event from './Event';
import { EventProps } from '../../interfaces/types';

const HomeEventsContainer = ({ eventData }: { eventData: EventProps[] }) => {
  return (
    <div>
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

export default HomeEventsContainer;
