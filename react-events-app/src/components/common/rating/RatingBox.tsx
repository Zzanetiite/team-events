import React from 'react';
import { Box, Typography } from '@mui/material';
import RatingSuccess from './RatingSuccess';
import RatingForbidden from './RatingForbidden';
import Row from '../../base/Row';

interface RatingBoxProps {
  submissionStatus: 'success' | 'error' | null;
  titleText: string;
  children: React.ReactNode;
}

const RatingBox = ({
  submissionStatus,
  children,
  titleText,
}: React.PropsWithChildren<RatingBoxProps>) => {
  return (
    <Row gap={1}>
      <Typography variant="body2">{titleText}</Typography>
      <Box sx={{ alignItems: 'center' }}>
        {children}
        <RatingSuccess submissionStatus={submissionStatus} />
        <RatingForbidden submissionStatus={submissionStatus} />
      </Box>
    </Row>
  );
};

export default RatingBox;
