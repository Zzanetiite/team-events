import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useJsApiLoader } from '@react-google-maps/api';
import { ChooseAddressProps } from '../../../interfaces/types';
import { libraries } from '../../../config';
import Loading from '../Loading';
import './../../../App.css';
import { REACT_APP_GOOGLE_MAPS_API_KEY } from '../../../constants';

const EventAddressInput: React.FC<ChooseAddressProps> = ({
  value,
  onChange,
  submitClicked,
  setSubmitClicked,
}) => {
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    id: 'google-map-script',
  });

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const newSearchBox = new google.maps.places.SearchBox(inputRef.current);
      setSearchBox(newSearchBox);

      newSearchBox.addListener('places_changed', () => {
        const places = newSearchBox.getPlaces();
        if (places && places.length > 0) {
          const place = places[0];
          if (place.formatted_address) {
            onChange({
              target: { name: 'address', value: place.formatted_address },
            } as React.ChangeEvent<HTMLInputElement>);
          }
          setInputValue(place.formatted_address || '');
        }
      });
    }
  }, [isLoaded]);

  /*
  To handle the first mount,
  searche's default is empty so
  passed in value gets ignored
   */
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (submitClicked) {
      if (searchBox) {
        setInputValue('');
      }
      setSubmitClicked(false);
    }
  }, [submitClicked, searchBox, setSubmitClicked]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (searchBox) {
      searchBox.setBounds(new google.maps.LatLngBounds());
      searchBox.getPlaces();
    }
    onChange(event);
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
