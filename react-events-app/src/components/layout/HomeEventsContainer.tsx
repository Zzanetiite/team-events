import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Event from './Event';
import { EventProps } from '../../interfaces/types';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import LoadingWithText from '../common/LoadingWithText';

const HomeEventsContainer = ({
  eventData,
  loading,
}: {
  eventData: EventProps[];
  loading: boolean;
}) => {
  if (loading) {
    return <LoadingWithText height={60} />;
  }

  if (eventData.length === 0 && !loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'orange',
          justifyContent: 'center',
          mt: 2,
          mb: 2,
        }}
      >
        <SearchOffIcon sx={{ mr: 1 }} />
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          No events found near this location
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ paddingX: 1, marginTop: 2, marginBottom: 2 }}
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
