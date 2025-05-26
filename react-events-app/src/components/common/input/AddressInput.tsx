import React, { forwardRef } from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Clear } from '@mui/icons-material';

interface AddressInputProps {
  name: string;
  value: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
}

const AddressInput = forwardRef<HTMLInputElement, AddressInputProps>(
  (
    {
      name,
      value,
      onChange,
      disabled = false,
      label = 'Search Address',
      placeholder = '',
    },
    ref
  ) => {
    const handleClear = () => {
      onChange('');
    };

    return (
      <Box display="flex" alignItems="center">
        <TextField
          name={name}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          fullWidth
          required
          inputRef={ref}
          slotProps={{
            input: {
              endAdornment: value && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClear}
                    edge="end"
                    size="small"
                    aria-label="clear"
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    );
  }
);

export default AddressInput;
