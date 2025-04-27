import React from 'react';
import { Card, CardContent } from '@mui/material';
import { EventProps } from '../../interfaces/types';
import EventHeader from '../common/EventHeader';
import EventDescription from '../common/EventDescription';
import AverageRatings from '../common/rating/AverageRating';

const Event: React.FC<EventProps> = (event) => {
  return (
    <div>
      <Card
        elevation={0}
        sx={{
          overflow: 'initial',
          width: 270,
          height: 200,
          display: 'flex',
          backgroundColor: 'transparent',
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
          <EventDescription description={event.description} />
          {/* <CommentsSection event={event} /> TODO: Move to page */}
          {/* TODO: Replace ratings with average value & voting to page */}
          {/* <Ratings event={event} /> */}
          <AverageRatings event={event} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Event;
