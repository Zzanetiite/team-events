import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ChevronRightRounded } from '@mui/icons-material';
import { CHAR_LIMITS } from '../../../constants/EventConstants';

export default function EventDescription({
  description,
}: {
  description: string;
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
        <Button
          onClick={() => {}}
          color={'primary'}
          sx={{
            mt: 0,
            textTransform: 'initial',
            padding: 0,
            minHeight: 'auto',
          }}
        >
          See full event details <ChevronRightRounded />
        </Button>
      </Box>
    </div>
  );
}
