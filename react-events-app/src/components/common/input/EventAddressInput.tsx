import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ChooseAddressProps } from '../../../interfaces/types';
import Loading from '../Loading';
import DraggablePinMap from '../map/DraggablePinMap';
import { defaultMapsContainerStartingLocation } from '../../../config';
import AddressInput from './AddressInput';
import { useGooglePlacesAutocomplete } from '../../../hooks/useGooglePlacesAutocomplete';

const EventAddressInput: React.FC<ChooseAddressProps> = ({
  value,
  onChange,
  submitClicked,
  setSubmitClicked,
  loading,
}) => {
  const [address, setAddress] = useState<string>(value.address);
  const [coordinates, setCoordinates] = useState(
    defaultMapsContainerStartingLocation
  );

  const onPlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (place.formatted_address && place.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      const newLocation = { lat, lng };
      setAddress(place.formatted_address);
      setCoordinates(newLocation);

      onChange({
        address: place.formatted_address,
        location: newLocation,
      });
    }
  };

  const { inputRef, placesLibrary } = useGooglePlacesAutocomplete(
    onPlaceSelected,
    ['geometry', 'formatted_address', 'name'],
    loading
  );

  // Whenever coordinates change (e.g., user drags the pin),
  // update parent with latest coordinates
  useEffect(() => {
    onChange({
      address: address,
      location: coordinates,
    });
  }, [coordinates, address, onChange]);

  // Reset input field if the form submit button
  // was clicked and reset is triggered
  useEffect(() => {
    if (submitClicked) {
      setAddress('');
      setSubmitClicked(false);
    }
  }, [submitClicked, setSubmitClicked]);

  if (!placesLibrary) return <Loading />;

  return (
    <Box>
      <AddressInput
        name="search-bar-create-event"
        value={address}
        onChange={setAddress}
        ref={inputRef}
        label="Search for an address or drag the pin..."
        disabled={loading}
      />
      <Typography
        variant="body2"
        sx={{ mb: 1, color: 'primary.main', textAlign: 'center' }}
      >
        Drag the pin to adjust the location
      </Typography>
      <DraggablePinMap
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        address={address}
        setAddress={setAddress}
      />
    </Box>
  );
};

export default EventAddressInput;
