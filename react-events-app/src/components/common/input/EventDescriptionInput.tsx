import React from 'react';
import { CreateUpdateEventInputProps } from '../../../interfaces/types';
import Row from '../../base/Row';
import HelperText from './HelperText';
import { CHAR_LIMITS } from '../../../constants/EventConstants';
import { TextField } from '@mui/material';

const EventDescriptionInput: React.FC<CreateUpdateEventInputProps> = ({
  value,
  onChange,
}) => {
  const helperText: string | null =
    value.length >= CHAR_LIMITS.EventDescriptionMax
      ? 'Decription limit is 255 characters.'
      : value.length <= CHAR_LIMITS.EventDescriptionMin
        ? 'Please write a description that is at least 20 characters long.'
        : null;
  const color: 'red' | 'primary' =
    value.length >= CHAR_LIMITS.EventDescriptionMax ? 'red' : 'primary';
  return (
    <Row>
      <TextField
        label="Description"
        name="description"
        value={value}
        onChange={onChange}
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        required
      />
      {helperText != null && <HelperText text={helperText} color={color} />}
    </Row>
  );
};

export default EventDescriptionInput;
