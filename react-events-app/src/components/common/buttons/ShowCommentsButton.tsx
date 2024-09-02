import React from 'react';
import { ChevronRightRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ShowCommentsButtonProps } from '../../../interfaces/types';

const ShowCommentsButton = ({
  showAllComments,
  setShowAllComments,
}: ShowCommentsButtonProps) => {
  return (
    <Button
      onClick={() => setShowAllComments(!showAllComments)}
      color={'primary'}
      sx={{
        mt: 0,
        textTransform: 'initial',
        padding: 0,
        minHeight: 'auto',
      }}
    >
      {showAllComments ? 'show less' : 'see more'} <ChevronRightRounded />
    </Button>
  );
};

export default ShowCommentsButton;
