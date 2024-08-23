import React from 'react';
import { Container, Grid } from '@mui/material';
import Event from '../components/layout/Event';
import CounterButton from '../components/common/CounterButton';
import { PlaceTypes } from '../constants';

const Home = () => {
  const events = [
    // EXAMPLE
    {
      eventTitle: 'Restaurant "The Place"',
      placeType: PlaceTypes.RESTAURANT,
      address: '123 Main St',
      description:
        'A lovely place to eat and hang out with friends. Great ambiance and food!',
      comments: [
        'Short comment!',
        'Great service. A lovely place to eat and hang out with friends. Great ambiance and food!',
        'Will visit again!A lovely place to eat and hang out with friends. Great ambiance and food!',
        'Great place to hang out with friends. A lovely place to eat and hang out with friends. Great ambiance and food!',
        'Good for families too. A lovely place to eat and hang out with friends. Great ambiance and food!',
      ],
      placeRating: 4.5,
      loudnessRating: 3,
    },
    {
      eventTitle: 'Cambridge Escape rooms',
      placeType: PlaceTypes.ESCAPE_ROOM,
      address: '123 Main St',
      description:
        'A lovely place to eat and hang out with friends. Great ambiance and food!',
      comments: [
        'Short comment!',
        'Great service. A lovely place to eat and hang out with friends. Great ambiance and food!',
        'Will visit again!A lovely place to eat and hang out with friends. Great ambiance and food!',
        'Great place to hang out with friends. A lovely place to eat and hang out with friends. Great ambiance and food!',
        'Good for families too. A lovely place to eat and hang out with friends. Great ambiance and food!',
      ],
      placeRating: 4.5,
      loudnessRating: 3,
    },
    {
      eventTitle: 'Cambridge Field',
      placeType: PlaceTypes.OUTDOOR_ACTIVITY,
      address: '123 Main St',
      description:
        'A lovely place to eat and hang out with friends. Great ambiance and food!',
      comments: [
        'Short comment!',
        'Great service. A lovely place to eat and hang out with friends. Great ambiance and food!',
        'Will visit again!A lovely place to eat and hang out with friends. Great ambiance and food!',
        'Great place to hang out with friends. A lovely place to eat and hang out with friends. Great ambiance and food!',
        'Good for families too. A lovely place to eat and hang out with friends. Great ambiance and food!',
      ],
      placeRating: 4.5,
      loudnessRating: 3,
    },
  ];

  return (
    <div>
      <CounterButton counterId={2} />
      <Container maxWidth="lg" sx={{ paddingX: 1 }}>
        <Grid container spacing={2}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Event {...event} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
