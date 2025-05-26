import React, { useEffect, useRef } from 'react';
import { Map, RenderingType, useMap } from '@vis.gl/react-google-maps';
import { DEFAULT_ZOOM_CREATE_EVENT } from '../../../constants/MapConstants';
import { MAP_ID } from '../../../constants';

const DraggablePinMap = ({
  coordinates,
  setCoordinates,
}: {
  coordinates: google.maps.LatLngLiteral;
  setCoordinates: (coords: google.maps.LatLngLiteral) => void;
  mapHeight?: string;
}) => {
  const map = useMap();
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  useEffect(() => {
    if (!map || !window.google?.maps?.marker) return;

    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.map = null;
    }

    // Create a draggable advanced marker
    const newMarker = new window.google.maps.marker.AdvancedMarkerElement({
      position: coordinates,
      map,
      gmpDraggable: true,
      title: 'Drag to adjust location',
    });

    // Listen for the dragend event
    newMarker.element.addEventListener('dragend', () => {
      const pos = newMarker.position;
      if (pos) {
        setCoordinates({ lat: Number(pos.lat), lng: Number(pos.lng) });
      }
    });

    markerRef.current = newMarker;

    map.setCenter(coordinates);
    map.setZoom(DEFAULT_ZOOM_CREATE_EVENT);

    return () => {
      newMarker.map = null;
    };
  }, [coordinates, map, setCoordinates]);

  return (
    <div
      className="map-container-create-event"
      style={{ height: '250px', width: '100%' }}
    >
      <Map
        defaultZoom={DEFAULT_ZOOM_CREATE_EVENT}
        defaultCenter={coordinates}
        mapId={MAP_ID}
        renderingType={RenderingType.UNINITIALIZED}
      />
    </div>
  );
};

export default DraggablePinMap;
