import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import Loading from '../common/Loading';

interface Props {
  setLocation: (location: google.maps.LatLngLiteral) => void;
}

const GoogleMapsSearchBar: React.FC<Props> = ({ setLocation }) => {
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const placesLibrary = useMapsLibrary('places');

  useEffect(() => {
    if (placesLibrary && inputRef.current) {
      const options = {
        fields: ['geometry', 'name', 'formatted_address'],
      };
      const autocomplete = new placesLibrary.Autocomplete(
        inputRef.current,
        options
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address && place.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setLocation({ lat, lng });
        }
      });
    }
  }, [placesLibrary, setLocation]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = event.target.value;
    setValue(newAddress);
  };

  if (!placesLibrary) return <Loading />;

  return (
    <Box alignItems="center" paddingRight={2} paddingLeft={2} paddingTop={1}>
      <TextField
        label="Start typing to search for events near a place... "
        name="search-bar"
        value={value}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="dense"
        inputRef={inputRef}
        className="searchbox"
      />
    </Box>
  );
};

export default GoogleMapsSearchBar;
