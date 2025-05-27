import React from 'react';
import { Box } from '@mui/material';
import Loading from '../Loading';
import AddressInput from '../input/AddressInput';
import { useGooglePlacesAutocomplete } from '../../../hooks/useGooglePlacesAutocomplete';

interface Props {
  setLocation: (location: google.maps.LatLngLiteral) => void;
  loading: boolean;
}

const GoogleMapsSearchBar: React.FC<Props> = ({ setLocation, loading }) => {
  const onPlaceSelected = (place: google.maps.places.PlaceResult) => {
    const location = place.geometry?.location;
    if (location) {
      const latLng = {
        lat: location.lat(),
        lng: location.lng(),
      };
      setLocation(latLng);
    }
  };

  const { inputRef, searchValue, setSearchValue, placesLibrary } =
    useGooglePlacesAutocomplete(
      onPlaceSelected,
      ['geometry', 'formatted_address', 'name'],
      loading
    );

  if (!placesLibrary) return <Loading />;

  return (
    <Box alignItems="center" paddingRight={2} paddingLeft={2} paddingTop={1}>
      <AddressInput
        disabled={loading}
        name="search-bar-home"
        value={searchValue}
        onChange={setSearchValue}
        ref={inputRef}
        label="Start typing to search for events near a place..."
      />
    </Box>
  );
};

export default GoogleMapsSearchBar;
