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
      : value.length <= CHAR_LIMITS.EventTitleMin && value.length > 0
        ? `Please write a title that is at least ${CHAR_LIMITS.EventTitleMin} chars long.`
        : null;
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
      {helperText != null && <HelperText text={helperText} color={'red'} />}
    </Row>
  );
};

export default EventTitleInput;
