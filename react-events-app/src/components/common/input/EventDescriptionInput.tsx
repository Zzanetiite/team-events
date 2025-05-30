import React from 'react';
import { CreateUpdateEventInputProps } from '../../../interfaces/types';
import Row from '../../base/Row';
import HelperText from './HelperText';
import { CHAR_LIMITS } from '../../../constants/EventConstants';
import { TextField } from '@mui/material';

const EventDescriptionInput: React.FC<CreateUpdateEventInputProps> = ({
  value,
  onChange,
  loading,
}) => {
  const helperText: string | null =
    value.length >= CHAR_LIMITS.EventDescriptionMax
      ? 'Decription limit is 255 characters.'
      : value.length <= CHAR_LIMITS.EventDescriptionMin && value.length > 0
        ? 'Please write a description that is at least 20 characters long.'
        : null;
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
        disabled={loading}
      />
      {helperText != null && <HelperText text={helperText} color={'red'} />}
    </Row>
  );
};

export default EventDescriptionInput;
