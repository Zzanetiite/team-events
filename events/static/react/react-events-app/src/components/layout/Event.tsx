import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
  Divider,
} from '@mui/material';
import AddressIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EventProps } from '../../interfaces/types';

const Event: React.FC<EventProps> = ({
  icon,
  placeType,
  address,
  description,
  comments,
  placeRating,
  loudnessRating,
}) => {
  const [showAllComments, setShowAllComments] = useState(false);

  const displayedComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {icon}
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              {placeType}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AddressIcon />
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              {address}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          {description}
        </Typography>
        <Box sx={{ marginTop: 1 }}>
          {displayedComments.map((comment: string, index: number) => (
            <Typography key={index} variant="body2">
              {comment}
            </Typography>
          ))}
          {comments.length > 3 && (
            <Button
              startIcon={<ExpandMoreIcon />}
              onClick={() => setShowAllComments(!showAllComments)}
            >
              {showAllComments ? 'Show Less' : 'See More'}
            </Button>
          )}
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ marginRight: 1 }}>
            Place:
          </Typography>
          <Rating value={placeRating} readOnly precision={0.1} />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            {placeRating.toFixed(1)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ marginRight: 1 }}>
            Loudness:
          </Typography>
          <Rating
            value={loudnessRating}
            onChange={(event, newValue) => {
              /* TODO: Handle rating change */
            }}
            precision={1}
            icon={<span>🔊</span>}
            emptyIcon={<span>🔊</span>}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default Event;
