import React from 'react';
import { TextField } from '@mui/material';
import { CreateUpdateEventInputProps } from '../../../interfaces/types';
import HelperText from './HelperText';
import Row from '../../base/Row';
import { CHAR_LIMITS } from '../../../constants/EventConstants';

const EventTitleInput: React.FC<CreateUpdateEventInputProps> = ({
  value,
  onChange,
}) => {
  const helperText: string | null =
    value.length >= CHAR_LIMITS.EventTitleMax
      ? 'Title limit is 40 characters.'
      : value.length <= CHAR_LIMITS.EventTitleMin
        ? 'Please write a title.'
        : null;
  const color: 'red' | 'primary' =
    value.length >= CHAR_LIMITS.EventTitleMax ? 'red' : 'primary';
  return (
    <Row>
      <TextField
        label="Event Title"
        name="eventTitle"
        value={value}
        onChange={onChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      {helperText != null && <HelperText text={helperText} color={color} />}
    </Row>
  );
};

export default EventTitleInput;
