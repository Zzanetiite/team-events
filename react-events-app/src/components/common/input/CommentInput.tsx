import { TextField, Typography } from '@mui/material';
import React from 'react';
import { CHAR_LIMITS } from '../../../constants/EventConstants';

const CommentInput = ({
  newComment,
  setNewComment,
}: {
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      placeholder="Write a comment..."
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      sx={{ marginBottom: 1 }}
      helperText={
        <Typography variant="inherit" color="red">
          {newComment.length > CHAR_LIMITS.CommentMax
            ? `Maximum allowed comment length is ${CHAR_LIMITS.CommentMax} characters.`
            : ''}
        </Typography>
      }
    />
  );
};

export default CommentInput;
