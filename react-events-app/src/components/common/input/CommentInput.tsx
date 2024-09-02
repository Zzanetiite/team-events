import { TextField } from '@mui/material';
import React from 'react';

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
    />
  );
};

export default CommentInput;
