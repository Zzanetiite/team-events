import { useState, useEffect } from 'react';
import { CommentDBProps, EventProps } from '../interfaces/types';
import { useApi } from './useApi';
import { useAuth } from '../context/AuthContext';
import { ApiEndpoints, COMMENT_LIMIT } from '../constants';
import { handleError } from '../errors/handleError';
import useAutoClearMessage from './useAutoClearMessage';
import { format } from 'date-fns';

const useComments = (event: EventProps) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [allComments, setAllComments] = useState<CommentDBProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const { user } = useAuth();

  useEffect(() => {
    if (event.comments && Array.isArray(event.comments)) {
      setAllComments(event.comments);
    }
  }, [event.comments]);

  const commentsData = allComments.map((comment) => ({
    username: comment.user,
    date: format(new Date(comment.date_created), 'yyyy-MM-dd'),
    text: comment.comment,
  }));

  const displayedComments = showAllComments
    ? commentsData
    : commentsData.slice(0, COMMENT_LIMIT);

  const handleAddComment = () => {
    setShowCommentInput(true);
  };

  useAutoClearMessage({ message: errorMessage, setMessage: setErrorMessage });

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const response: CommentDBProps = await fetchWithTokens(
          ApiEndpoints.SUBMIT_COMMENT,
          {
            method: 'POST',
            body: JSON.stringify({
              event: event.id,
              comment: newComment,
              user: user.userId,
            }),
          }
        );

        if (response) {
          setAllComments([response, ...allComments]);
          setNewComment('');
          setShowCommentInput(false);
          setErrorMessage(null);
        }
      } catch (error: any) {
        handleError({
          error,
          setErrorMessage,
          overrideErrorHandlers: {
            403: (setErrorMessage) => {
              setErrorMessage('Please login to leave comments.');
            },
          },
        });
      }
    }
  };

  const handleCloseCommentAdd = () => {
    setShowCommentInput(false);
  };

  return {
    showAllComments,
    setShowAllComments,
    showCommentInput,
    newComment,
    setNewComment,
    allComments,
    setAllComments,
    errorMessage,
    handleAddComment,
    handleCommentSubmit,
    handleCloseCommentAdd,
    displayedComments,
  };
};

export default useComments;
