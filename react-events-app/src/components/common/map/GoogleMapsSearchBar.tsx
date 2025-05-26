import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import Loading from '../Loading';
import AddressInput from '../input/AddressInput';

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

  if (!placesLibrary) return <Loading />;

  return (
    <Box alignItems="center" paddingRight={2} paddingLeft={2} paddingTop={1}>
      <AddressInput
        name="search-bar-home"
        value={value}
        onChange={setValue}
        ref={inputRef}
        label="Start typing to search for events near a place..."
      />
    </Box>
  );
};

export default GoogleMapsSearchBar;
