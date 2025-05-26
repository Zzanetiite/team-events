import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <div>
      <Box
        sx={{
          height: '400px',
          width: '100%',
        }}
      />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            Team Events {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default Footer;
