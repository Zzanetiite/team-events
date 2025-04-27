import * as React from 'react';
import { FormHelperText } from '@mui/material';

interface Props {
  text: string;
  color?: 'primary' | 'red' | 'blue';
}

const HelperText: React.FC<Props> = ({ text, color = 'primary' }) => {
  return (
    <FormHelperText
      sx={{
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        textAlign: 'center',
        marginTop: '1px',
        color: `${color}`,
      }}
    >
      {text}
    </FormHelperText>
  );
};

export default HelperText;
