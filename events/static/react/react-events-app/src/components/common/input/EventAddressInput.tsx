import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useJsApiLoader } from '@react-google-maps/api';
import { ChooseAddressProps } from '../../../interfaces/types';
import { libraries } from '../../../config';
import Loading from '../Loading';
import { MAP_ID, REACT_APP_GOOGLE_MAPS_API_KEY } from '../../../constants';

const EventAddressInput: React.FC<ChooseAddressProps> = ({
  value = { address: '', location: { lat: 0, lng: 0 } },
  onChange,
  submitClicked,
  setSubmitClicked,
}) => {
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [inputValue, setInputValue] = useState<string>(value.address);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    id: MAP_ID,
  });

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const newSearchBox = new google.maps.places.SearchBox(inputRef.current);
      setSearchBox(newSearchBox);

      newSearchBox.addListener('places_changed', () => {
        const places = newSearchBox.getPlaces();
        if (places && places.length > 0) {
          const place = places[0];
          if (place.formatted_address && place.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setInputValue(place.formatted_address);
            onChange({
              address: place.formatted_address,
              location: { lat, lng },
            });
          }
        }
      });
    }
  }, [isLoaded]);

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
    if (searchBox) {
      searchBox.setBounds(new google.maps.LatLngBounds());
      searchBox.getPlaces();
    }
  };

  if (!isLoaded) return <Loading />;

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
