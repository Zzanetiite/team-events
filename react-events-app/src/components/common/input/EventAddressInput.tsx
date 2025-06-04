import React, { useCallback, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { ChooseAddressProps } from '../../../interfaces/types';
import Loading from '../Loading';
import DraggablePinMap from '../map/DraggablePinMap';
import AddressInput from './AddressInput';
import { useGooglePlacesAutocomplete } from '../../../hooks/useGooglePlacesAutocomplete';
import { useDataContext } from '../../../context/DataContext';
import { defaultMapsContainerStartingLocation } from '../../../config';

const EventAddressInput: React.FC<ChooseAddressProps> = ({
  onChange,
  submitClicked,
  setSubmitClicked,
  loading,
}) => {
  const { formAddress, setFormAddress, formCoordinates, setFormCoordinates } =
    useDataContext();

  const onPlaceSelected = useCallback(
    (place: google.maps.places.PlaceResult) => {
      if (place.formatted_address && place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        const newLocation = { lat, lng };
        setFormAddress(place.formatted_address);
        setFormCoordinates(newLocation);
        onChange({
          address: place.formatted_address,
          location: newLocation,
        });
      }
    },
    [onChange, setFormAddress, setFormCoordinates]
  );

  const {
    inputRef,
    setSearchValue,
    suggestions,
    suppressAutocomplete,
    selectPlace,
    placesLibrary,
  } = useGooglePlacesAutocomplete(
    onPlaceSelected,
    ['geometry', 'formatted_address'],
    loading
  );

  // Whenever coordinates change (e.g., user drags the pin),
  // update parent with latest coordinates
  useEffect(() => {
    onChange({
      address: formAddress || '',
      location: formCoordinates || defaultMapsContainerStartingLocation,
    });
  }, [formAddress, formCoordinates, onChange]);

  // Reset input field if the form submit button
  // was clicked and reset is triggered
  useEffect(() => {
    if (submitClicked) {
      setFormAddress('');
      setSubmitClicked(false);
    }
  }, [submitClicked, setSubmitClicked, setFormAddress]);

  if (!placesLibrary) return <Loading />;
  return (
    <Box>
      <AddressInput
        name="search-bar-create-event"
        value={formAddress ?? ''}
        onChange={(newValue) => {
          setFormAddress(newValue); // For context memory
          setSearchValue(newValue); // For autocomplete
        }}
        ref={inputRef}
        label={formAddress ? '' : 'Search for an address or drag the pin...'}
        disabled={loading}
        suggestions={suggestions}
        suppressAutocomplete={suppressAutocomplete}
        selectPlace={selectPlace}
      />
      <Typography
        variant="body2"
        sx={{ mb: 1, color: 'primary.main', textAlign: 'center' }}
      >
        Drag the pin to adjust the location
      </Typography>
      <DraggablePinMap
        coordinates={formCoordinates}
        setCoordinates={setFormCoordinates}
        address={formAddress}
        setAddress={setFormAddress}
      />
    </Box>
  );
};

export default EventAddressInput;
