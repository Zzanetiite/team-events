import React, { useCallback, useEffect } from 'react';
import { Map, RenderingType, useMap } from '@vis.gl/react-google-maps';
import { Box, Button } from '@mui/material';
import { EventProps } from '../../../interfaces/types';
import {
  DEFAULT_ZOOM,
  UNKNOWN_LOCATION,
} from '../../../constants/MapConstants';
import { defaultMapsContainerStartingLocation } from '../../../config';
import PoiMarkers from './PoiMarkers';
import { MAP_ID } from '../../../constants';
import GoogleMapsSearchBar from './GoogleMapsSearchBar';

const GoogleMap = ({
  events,
  setCurrentLocation,
  currentCoordinates,
  setCurrentCoordinates,
  loading,
}: {
  events: EventProps[];
  setCurrentLocation: React.Dispatch<React.SetStateAction<string>>;
  currentCoordinates: google.maps.LatLngLiteral | null;
  setCurrentCoordinates: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral | null>
  >;
  loading: boolean;
}) => {
  const [locationReady, setLocationReady] = React.useState(false);
  const map = useMap();

  // Function to reverse geocode and get city name
  // https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
  const reverseGeocode = useCallback(
    async (location: google.maps.LatLngLiteral) => {
      if (google.maps && google.maps.importLibrary) {
        google.maps.importLibrary('geocoding').then(() => {
          const geocoder = new google.maps.Geocoder();
          const latLng = new google.maps.LatLng(location.lat, location.lng);

          geocoder.geocode({ location: latLng }, (results, status) => {
            if (
              status === google.maps.GeocoderStatus.OK &&
              results &&
              results?.length > 0
            ) {
              const city = results.find(
                (result) =>
                  result.types.includes('locality') ||
                  result.types.includes('administrative_area_level_1')
              );
              if (city) {
                setCurrentLocation(city.formatted_address);
                setLocationReady(true);
              } else {
                // Handle cases where no city is found
                const postalCode = results.find((result) =>
                  result.types.includes('postal_code')
                );
                if (postalCode) {
                  const postalCodeParts =
                    postalCode.formatted_address.split(' ');
                  setCurrentLocation(
                    postalCodeParts[0] || postalCode.formatted_address
                  );
                  setLocationReady(true);
                } else {
                  setCurrentLocation(UNKNOWN_LOCATION);
                  setLocationReady(true);
                }
              }
            } else {
              setCurrentLocation(UNKNOWN_LOCATION);
              setLocationReady(true);
            }
          });
        });
      }
    },
    [setCurrentLocation]
  );

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCurrentCoordinates(location);
            reverseGeocode(location); // update city name
          },
          () => {
            // User did not consent to sharing their location
            console.log(
              'Error or denied geolocation request. Setting default starting location.'
            );
            setCurrentCoordinates(defaultMapsContainerStartingLocation);
            reverseGeocode(defaultMapsContainerStartingLocation);
            setLocationReady(true);
          }
        );
      } else {
        setCurrentCoordinates(defaultMapsContainerStartingLocation);
        reverseGeocode(defaultMapsContainerStartingLocation);
        setLocationReady(true);
      }
    };

    getLocation();
  }, [reverseGeocode, setCurrentCoordinates]);

  const handleLocationUpdate = () => {
    if (map) {
      const center =
        map.getCenter()?.toJSON() ?? defaultMapsContainerStartingLocation;
      map.setCenter(center);
      map.setZoom(DEFAULT_ZOOM);
      setCurrentCoordinates(center);
      reverseGeocode(center);
    }
  };

  const handleSearchLocation = (location: google.maps.LatLngLiteral) => {
    if (!map) {
      return;
    }

    if (location && window.google?.maps && map) {
      map.setCenter(location);
      map.setZoom(DEFAULT_ZOOM);
      setCurrentCoordinates(location);
      reverseGeocode(location);
    } else {
      console.warn(
        'Could not update map location. Map or Google not available:',
        {
          hasLocation: !!location,
          hasGoogle: !!window.google?.maps,
          hasMap: !!map,
        }
      );
    }
  };

  return (
    <Box margin={0}>
      <GoogleMapsSearchBar
        setLocation={handleSearchLocation}
        loading={loading}
      />
      <Box paddingLeft={2} paddingRight={2} paddingBottom={2} paddingTop={0}>
        <div
          className="map-container"
          style={{ height: '250px', width: '100%' }}
        >
          {locationReady && (
            <Map
              defaultZoom={DEFAULT_ZOOM}
              defaultCenter={
                currentCoordinates || defaultMapsContainerStartingLocation
              }
              mapId={MAP_ID}
              renderingType={RenderingType.UNINITIALIZED}
            >
              <PoiMarkers events={events} />
            </Map>
          )}
        </div>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleLocationUpdate}
          size="small"
        >
          Search zoomed-in Location
        </Button>
      </Box>
    </Box>
  );
};

export default GoogleMap;
