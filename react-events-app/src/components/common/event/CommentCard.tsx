import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { CommentCardProps } from '../../../interfaces/types';

const CommentCard: React.FC<CommentCardProps> = ({ username, date, text }) => {
  return (
    <Card sx={{ marginBottom: 1 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
          <Typography variant="subtitle2" sx={{ marginRight: 1 }}>
            {username}
          </Typography>
          <Typography variant="caption" sx={{ marginLeft: 1, color: 'gray' }}>
            {date}
          </Typography>
        </Box>
        <Typography variant="body2">{text}</Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
