import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { ChooseAddressProps } from '../../../interfaces/types';
import Loading from '../Loading';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

const EventAddressInput: React.FC<ChooseAddressProps> = ({
  value = { address: '', location: { lat: 0, lng: 0 } },
  onChange,
  submitClicked,
  setSubmitClicked,
}) => {
  const [inputValue, setInputValue] = useState<string>(value.address);
  const inputRef = useRef<HTMLInputElement>(null);
  const placesLibrary = useMapsLibrary('places');

  useEffect(() => {
    if (placesLibrary && inputRef.current) {
      const options = {
        fields: ['geometry', 'name', 'formatted_address'],
      };
      const newAutocomplete = new placesLibrary.Autocomplete(
        inputRef.current,
        options
      );

      newAutocomplete.addListener('place_changed', () => {
        const place = newAutocomplete.getPlace();
        if (place.formatted_address && place.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setInputValue(place.formatted_address);
          onChange({
            address: place.formatted_address,
            location: { lat, lng },
          });
        }
      });
    }
  }, [placesLibrary, onChange]);

  useEffect(() => {
    setInputValue(value.address || '');
  }, [value]);

  useEffect(() => {
    if (submitClicked) {
      setInputValue('');
      setSubmitClicked(false);
    }
  }, [submitClicked, setSubmitClicked]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = event.target.value;
    setInputValue(newAddress);
    onChange({ address: newAddress, location: { lat: 0, lng: 0 } });
  };

  if (!placesLibrary) return <Loading />;

  return (
    <Box alignItems="center">
      <TextField
        label="Address"
        name="address"
        value={inputValue}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        inputRef={inputRef}
        className="searchbox"
      />
    </Box>
  );
};

export default EventAddressInput;
