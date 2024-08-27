import React from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import { useState } from 'react';
import { ChevronRightRounded } from '@mui/icons-material';
import { COMMENT_LIMIT } from '../../constants';

function CommentCard({
  username,
  date,
  text,
}: {
  username: string;
  date: string;
  text: string;
}) {
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
}

// TODO: Should take the comments object with data instead
export default function CommentsSection({ comments }: { comments: string[] }) {
  const [showAllComments, setShowAllComments] = useState(false);

  // Temporary data for demo, replace with real data
  const commentsData = comments.map((comment, index) => ({
    username: `User${index + 1}`,
    date: new Date().toLocaleDateString(),
    text: comment,
  }));

  const displayedComments = showAllComments
    ? commentsData
    : commentsData.slice(0, COMMENT_LIMIT);

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
      {comments.length > COMMENT_LIMIT && (
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
      )}
    </Box>
  );
}
