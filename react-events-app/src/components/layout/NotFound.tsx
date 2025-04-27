import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container sx={{ textAlign: 'center', padding: '50px' }}>
      <Typography
        variant="h1"
        component="h1"
        color="error"
        sx={{ fontWeight: 'bold' }}
      >
        404
      </Typography>
      <Typography variant="h5" component="p" sx={{ margin: '20px 0' }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ textTransform: 'none', marginTop: '20px' }}
        >
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
