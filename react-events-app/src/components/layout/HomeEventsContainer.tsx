import React from 'react';
import { Box, Grid } from '@mui/material';
import Event from './Event';
import { EventProps } from '../../interfaces/types';

const HomeEventsContainer = ({ eventData }: { eventData: EventProps[] }) => {
  return (
    <div>
      <Box
        component="h2"
        sx={{
          mt: 1,
          mb: 0,
          fontWeight: 'bold',
          lineHeight: 1.45,
          textAlign: 'center',
          color: 'primary.main',
        }}
      >
        Events found near LOCATION_NAME
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ paddingX: 1, marginTop: 0, marginBottom: 2 }}
        justifyContent="center"
      >
        {eventData.map((event, index) => (
          <Grid item key={index}>
            <Event {...event} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomeEventsContainer;
