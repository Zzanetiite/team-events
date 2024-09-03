import React from 'react';
import { Map, RenderingType } from '@vis.gl/react-google-maps';
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
          renderingType={RenderingType.UNINITIALIZED}
        >
          <PoiMarkers events={events} />
        </Map>
      </div>
    </Box>
  );
};

export default GoogleMap;
