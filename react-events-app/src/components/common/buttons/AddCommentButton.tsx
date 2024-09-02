import React from 'react';
import { Button } from '@mui/material';

const AddCommentButton = ({
  handleAddComment,
}: {
  handleAddComment: () => void;
}) => {
  return (
    <Button
      onClick={handleAddComment}
      color={'secondary'}
      sx={{
        textTransform: 'initial',
        padding: 0,
        minHeight: 'auto',
        fontSize: 'small',
      }}
    >
      Add Comment
    </Button>
  );
};

export default AddCommentButton;
