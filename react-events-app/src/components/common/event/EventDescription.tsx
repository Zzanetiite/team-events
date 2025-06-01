import React from 'react';
import { Box, Typography } from '@mui/material';
import { CHAR_LIMITS } from '../../../constants/EventConstants';

export default function EventDescription({
  description,
  id,
}: {
  description: string;
  id: number;
}) {
  return (
    <div>
      <Box height={70}>
        <Typography
          color={'Description'}
          variant={'body2'}
          sx={{
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          {description.length >= CHAR_LIMITS.EventDescriptionMaxDisplayed
            ? `${description.substring(0, CHAR_LIMITS.EventDescriptionMaxDisplayed - 1)}...`
            : description}
        </Typography>
      </Box>
    </div>
  );
}
