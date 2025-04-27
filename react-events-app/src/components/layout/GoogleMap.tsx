import React, { useEffect, useState } from 'react';
import { Map, RenderingType } from '@vis.gl/react-google-maps';
import { Box } from '@mui/material';
import { MAP_ID } from '../../constants';
import PoiMarkers from '../common/map/PoiMarkers';
import { EventProps } from '../../interfaces/types';
import { defaultMapsContainerStartingLocation } from '../../config';

const GoogleMap = ({ events }: { events: EventProps[] }) => {
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    // Function to handle geolocation
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // User consented, set their location
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => {
            // User did not conset to sharing their location
            console.log(
              'Error or denied geolocation request. Setting default starting location.'
            );
            setUserLocation(null);
          }
        );
      } else {
        console.log('Geolocation not supported by the browser.');
        setUserLocation(null);
      }
    };

    getLocation();
  }, []);

  return (
    <Box paddingLeft={2} paddingRight={2} paddingTop={1}>
      <div className="map-container">
        <Map
          defaultZoom={13}
          defaultCenter={userLocation || defaultMapsContainerStartingLocation}
          mapId={MAP_ID}
          renderingType={RenderingType.UNINITIALIZED}
        >
          <PoiMarkers events={events} />
        </Map>
      </div>
    </Box>
  );
};

export default GoogleMap;
