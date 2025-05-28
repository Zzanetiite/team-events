import React from 'react';
import { Box } from '@mui/material';
import CommentCard from './CommentCard';
import StatusAlert from '../StatusAlert';
import useComments from '../../../hooks/useComments';
import { EventProps } from '../../../interfaces/types';
import { COMMENT_LIMIT } from '../../../constants';
import ShowCommentsButton from '../buttons/ShowCommentsButton';
import AddCommentButton from '../buttons/AddCommentButton';
import EmptySubmitButton from '../buttons/EmptySubmitButton';
import EmptyCancelButton from '../buttons/EmptyCancelButton';
import CommentInput from '../input/CommentInput';

export default function CommentsSection({ event }: { event: EventProps }) {
  const {
    showAllComments,
    setShowAllComments,
    showCommentInput,
    newComment,
    setNewComment,
    allComments,
    errorMessage,
    handleAddComment,
    handleCommentSubmit,
    handleCloseCommentAdd,
    displayedComments,
  } = useComments(event);
  return (
    <Box sx={{ marginTop: 1 }}>
      {displayedComments.map((comment, index) => (
        <CommentCard
          key={index}
          username={comment.username}
          date={comment.date}
          text={comment.text}
        />
      ))}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {allComments.length > COMMENT_LIMIT && (
          <ShowCommentsButton
            showAllComments={showAllComments}
            setShowAllComments={setShowAllComments}
          />
        )}
        <AddCommentButton handleAddComment={handleAddComment} />
      </Box>
      {errorMessage && <StatusAlert message={errorMessage} severity="error" />}
      {showCommentInput && (
        <Box sx={{ marginTop: 1 }}>
          <CommentInput newComment={newComment} setNewComment={setNewComment} />
          <EmptySubmitButton handleSubmit={handleCommentSubmit} />
          <EmptyCancelButton
            handleClose={handleCloseCommentAdd}
            text="Cancel"
          />
        </Box>
      )}
    </Box>
  );
}
