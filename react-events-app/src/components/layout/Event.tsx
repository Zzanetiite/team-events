import React from 'react';
import { Card, CardContent } from '@mui/material';
import { EventProps } from '../../interfaces/types';
import EventHeader from '../common/event/EventHeader';
import EventDescription from '../common/event/EventDescription';
import AverageRatings from '../common/rating/AverageRating';

const Event: React.FC<EventProps> = (event) => {
  return (
    <a
      href={`/event/${event.id}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <Card
        elevation={0}
        sx={{
          overflow: 'initial',
          width: 270,
          height: 210,
          display: 'flex',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            backgroundColor: '#f5faff',
            transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
          },
        }}
      >
        <CardContent
          sx={{
            boxShadow:
              '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            padding: 3,
            backgroundColor: '#fff',
            borderRadius: '4px',
          }}
        >
          <EventHeader
            eventTitle={event.eventTitle}
            placeType={event.placeType}
            address={event.location.address}
          />
          <EventDescription description={event.description} id={event.id} />
          <AverageRatings event={event} />
        </CardContent>
      </Card>
    </a>
  );
};

export default Event;
