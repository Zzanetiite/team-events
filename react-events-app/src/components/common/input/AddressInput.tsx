import React, { forwardRef, useState } from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { Prediction } from '../../../hooks/useGooglePlacesAutocomplete';

interface AddressInputProps {
  name: string;
  value: string | null;
  onChange: (newValue: string) => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  suggestions: Prediction[];
  suppressAutocomplete: () => void;
  selectPlace: (placeId: string) => void;
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
      suggestions,
      suppressAutocomplete,
      selectPlace,
    },
    ref
  ) => {
    const handleClear = () => {
      onChange('');
    };
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, suggestions.length - 1)
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (highlightedIndex >= 0) {
          e.preventDefault();
          suppressAutocomplete();
          const selected = suggestions[highlightedIndex];
          onChange(selected.description);
          selectPlace(selected.place_id);
          setHighlightedIndex(-1);
        }
      } else if (e.key === 'Escape') {
        setHighlightedIndex(-1);
      }
    };

    return (
      <Box
        display="flex"
        flexDirection="column"
        position="relative"
        width="100%"
      >
        <TextField
          name={name}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          autoComplete="off" // Disable browser's autocomplete in favour of Google Autocomplete
          fullWidth
          required
          inputRef={ref}
          onKeyDown={handleKeyDown}
          slotProps={{
            input: {
              autoComplete: 'off', // disable native input too
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

        {suggestions.length > 0 && (
          <ul
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              margin: 0,
              padding: 0,
              listStyle: 'none',
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            {suggestions.map((s, i) => (
              <li
                key={s.place_id}
                onClick={() => {
                  suppressAutocomplete();
                  onChange(s.description);
                  selectPlace(s.place_id);
                  setHighlightedIndex(-1);
                }}
                onMouseEnter={() => setHighlightedIndex(i)}
                style={{
                  padding: '8px',
                  backgroundColor: i === highlightedIndex ? '#eee' : 'white',
                  cursor: 'pointer',
                }}
              >
                {s.description}
              </li>
            ))}
          </ul>
        )}
      </Box>
    );
  }
);

export default AddressInput;
