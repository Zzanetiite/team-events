import React from 'react';
import { Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { Box } from '@mui/material';
import { MAP_ID } from '../../constants';
import PoiMarkers from '../common/map/PoiMarkers';
import { EventProps } from '../../interfaces/types';
import { mapsContainerStartingLocation } from '../../config';

const GoogleMap = ({ events }: { events: EventProps[] }) => {
  return (
    <Box paddingLeft={2} paddingRight={2} paddingTop={1}>
      <div className="map-container">
        <Map
          defaultZoom={13}
          defaultCenter={mapsContainerStartingLocation}
          mapId={MAP_ID}
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log(
              'camera changed:',
              ev.detail.center,
              'zoom:',
              ev.detail.zoom
            )
          }
        >
          <PoiMarkers events={events} />
        </Map>
      </div>
    </Box>
  );
};

export default GoogleMap;
