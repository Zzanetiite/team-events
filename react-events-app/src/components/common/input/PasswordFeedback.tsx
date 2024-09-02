import { FormHelperText } from '@mui/material';
import React from 'react';

const PasswordFeedback = ({ feedback }: { feedback: string }) => {
  return (
    <>
      <FormHelperText
        sx={{
          maxWidth: 200,
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          textAlign: 'center',
          marginTop: '4px',
          color: '#CF0234',
        }}
      >
        {feedback}
      </FormHelperText>
    </>
  );
};

export default PasswordFeedback;
