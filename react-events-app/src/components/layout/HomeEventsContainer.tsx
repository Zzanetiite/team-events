import React from 'react';
import { Grid } from '@mui/material';
import Event from './Event';
import { EventProps } from '../../interfaces/types';

const HomeEventsContainer = ({ eventData }: { eventData: EventProps[] }) => {
  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ paddingX: 1, marginTop: 0, marginBottom: 2 }}
        justifyContent="center"
      >
        {eventData.map((event, index) => (
          <Grid key={index}>
            <Event {...event} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomeEventsContainer;
