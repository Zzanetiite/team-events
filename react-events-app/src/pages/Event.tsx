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
import { Box, Typography } from '@mui/material';
import { createStyledIcon } from '../components/common/event/EventHeader';
import Row from '../components/base/Row';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from '@mui/material/Link';

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

      <Typography
        variant="body2"
        color="grey"
        align="left"
        display="flex"
        alignItems="center"
        paddingRight={2}
        paddingLeft={2}
        paddingBottom={1}
      >
        {event.description}
      </Typography>

      <Row
        sx={{ justifyContent: 'space-between' }}
        paddingRight={2}
        paddingLeft={2}
        paddingBottom={1}
      >
        <Typography
          variant="body2"
          color="dark-grey"
          display={'flex'}
          alignItems={'center'}
        >
          {createStyledIcon(
            PlaceTypeIcons[event.placeType],
            PlaceTypeColors[event.placeType]
          )({})}
          <span>{event.placeType}</span>
        </Typography>

        <Link
          href={`https://www.google.com/maps?q=${event.location.location.lat},${event.location.location.lng}`}
          target="_blank"
          rel="noreferrer"
          underline="none"
          display="flex"
          alignItems="center"
          color="primary"
          sx={{ gap: 0.5 }}
        >
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">View in Maps</Typography>
        </Link>
      </Row>

      <div className="event-section">
        <img src={PlaceTypeImages[event.placeType]} alt={event.placeType} />
      </div>

      <Box paddingLeft={2} paddingRight={2}>
        <Typography variant="h6" color="primary">
          Rate this place
        </Typography>
        <Typography variant="body2">Average ratings</Typography>
        <AverageRatings event={event} />

        <Ratings event={event} />
      </Box>

      <Box padding={2}>
        <Typography variant="h6" color="grey">
          Comments
        </Typography>
        <CommentsSection event={event} />
      </Box>
    </div>
  );
};

export default Event;
