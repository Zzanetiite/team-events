import React from 'react';
import { Box, Typography } from '@mui/material';

export default function EventDescription({
  description,
}: {
  description: string;
}) {
  return (
    <div>
      <Box>
        <Typography color={'Description'} variant={'body2'}>
          {description}
        </Typography>
      </Box>
    </div>
  );
}
