import React from 'react';
import { Grid } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import Event from '../components/layout/Event';
import CounterButton from '../components/common/CounterButton';

const Home = () => {
  const events = [
    // EXAMPLE
    {
      icon: <PlaceIcon />,
      placeType: 'Restaurant',
      address: '123 Main St',
      description:
        'A lovely place to eat and hang out with friends. Great ambiance and food!',
      comments: [
        'Amazing food!',
        'Great service.',
        'Will visit again!',
        'Great place to hang out with friends.',
        'Good for families too.',
      ],
      placeRating: 4.5,
      loudnessRating: 3,
    },
  ];

  return (
    <div>
      <CounterButton counterId={2} />
      <Grid container spacing={2}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Event {...event} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
