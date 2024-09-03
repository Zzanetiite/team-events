import React, { useState } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import Loading from './Loading';
import StatusAlert from './StatusAlert';
import { libraries } from '../../config';

const LocationSearch: React.FC = () => {
  const [address, setAddress] = React.useState('');
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCL2I9nxOxPtkkPX7dAzDRys4jzOOvNj3g', // TODO: Pass trough Django
    libraries,
    id: 'google-map-script',
  });

  const onPlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (place.formatted_address) {
      setAddress(place.formatted_address);
    }
  };

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place) {
        onPlaceSelected(place);
      }
    }
  };

  if (loadError)
    return <StatusAlert severity="error" message="Error loading maps" />;
  if (!isLoaded) return <Loading />;

  return (
    <div>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search a location"
          style={{
            width: '100%',
            height: '40px',
            paddingLeft: '16px',
          }}
        />
      </Autocomplete>
      {/* <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
      /> */}
    </div>
  );
};

export default LocationSearch;
