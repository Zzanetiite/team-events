// https://mui.com/material-ui/react-card/
import React from 'react';
import { Card, CardContent } from '@mui/material';
import { EventProps } from '../../interfaces/types';
import Ratings from '../common/Rating';
import EventHeader from '../common/EventHeader';
import CommentsSection from '../common/CommentsSection';
import EventDescription from '../common/EventDescription';

const Event: React.FC<EventProps> = ({
  eventTitle,
  placeType,
  address,
  description,
  comments,
  placeRating,
  loudnessRating,
}) => {
  return (
    <div>
      <Card
        elevation={0}
        sx={{
          overflow: 'initial',
          maxWidth: 500,
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
            eventTitle={eventTitle}
            placeType={placeType}
            address={address}
          />
          <EventDescription description={description} />
          <CommentsSection comments={comments} />
          <Ratings placeRating={placeRating} loudnessRating={loudnessRating} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Event;
