import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ApiEndpoints,
  PlaceTypeColors,
  PlaceTypeIcons,
  PlaceTypeImages,
} from '../constants';
import { EventDBProps, EventProps } from '../interfaces/types';
import LoadingWithText from '../components/common/LoadingWithText';
import { useApi } from '../hooks/useApi';
import { mapEventData } from '../utils/mapping';
import NotFound from '../components/layout/NotFound';
import StatusAlert from '../components/common/StatusAlert';
import AverageRatings from '../components/common/rating/AverageRating';
import CommentsSection from '../components/common/event/CommentsSection';
import Ratings from '../components/common/rating/Ratings';
import { Box, Paper, Typography } from '@mui/material';
import { createStyledIcon } from '../components/common/event/EventHeader';

const Event: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<EventProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { fetchWithTokens } = useApi();

  useEffect(() => {
    fetchWithTokens(ApiEndpoints.GET_EVENT_BY_ID(Number(id)), { method: 'GET' })
      .then((data: EventDBProps) => {
        setEvent(mapEventData([data])[0]);
        setLoading(false);
      })
      .catch((error: any) => {
        if (error.status === 404) {
        } else {
          console.error('Error fetching the event', error);
          setError('Error fetching the event.');
        }
        setLoading(false);
      });
  }, [id, fetchWithTokens]);

  if (loading) return <LoadingWithText />;

  if (error) {
    return <StatusAlert message={error.toString()} severity={'error'} />;
  }

  if (!event) return <NotFound />;

  return (
    <div>
      <Typography variant="h4" align="center" padding={2} color="primary">
        {event.eventTitle}
      </Typography>
      <div className="event-section">
        <img src={PlaceTypeImages[event.placeType]} alt={event.placeType} />
      </div>
      <Typography
        variant="body2"
        align="left"
        paddingLeft={2}
        paddingRight={2}
        color="grey"
        display="flex"
        alignItems="center"
      >
        {createStyledIcon(
          PlaceTypeIcons[event.placeType],
          PlaceTypeColors[event.placeType]
        )({})}
        <span>{event.placeType}</span>
      </Typography>
      <Typography
        variant="body2"
        align="left"
        paddingLeft={2}
        paddingRight={2}
        color="grey"
      >
        Address: {event.location.address},{` `}
        <a
          href={`https://www.google.com/maps?q=${event.location.location.lat},${event.location.location.lng}`}
          target="_blank"
          rel="noreferrer"
        >
          view on Google Maps.
        </a>
      </Typography>
      <Box padding={2}>
        <Paper
          elevation={1}
          sx={{
            backgroundColor: 'grey.100',
            p: 2,
            maxWidth: '100%',
          }}
        >
          <Typography
            variant="body2"
            align="left"
            display="flex"
            alignItems="center"
          >
            {event.description}
          </Typography>
        </Paper>
      </Box>
      <Box paddingLeft={2} paddingRight={2}>
        <Typography variant="h6" color="primary">
          Ratings
        </Typography>
        <Typography variant="body2" color="primary">
          Leave a rating (once per user)
        </Typography>
        <Ratings event={event} />
        <Typography variant="body2" color="primary">
          Average ratings
        </Typography>
        <AverageRatings event={event} />
      </Box>
      <Box padding={2}>
        <Typography variant="h6" color="primary">
          Comments
        </Typography>
        <CommentsSection event={event} />
      </Box>
    </div>
  );
};

export default Event;
