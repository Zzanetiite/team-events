import React, { useEffect, useRef } from 'react';
import { Map, useMap } from '@vis.gl/react-google-maps';
import { DEFAULT_ZOOM_CREATE_EVENT } from '../../../constants/MapConstants';
import { MAP_ID } from '../../../constants';
import { defaultMapsContainerStartingLocation } from '../../../config';

const DraggablePinMap = ({
  coordinates,
  setCoordinates,
  address,
  setAddress,
}: {
  coordinates: google.maps.LatLngLiteral | null;
  setCoordinates: (coords: google.maps.LatLngLiteral | null) => void;
  address: string | null;
  setAddress: (address: string | null) => void;
  mapHeight?: string;
}) => {
  const map = useMap();
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  useEffect(() => {
    if (!map || !window.google?.maps?.marker || !coordinates) return;

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
    newMarker.addListener('dragend', () => {
      console.log('marker listener');
      const pos = newMarker.position;
      if (pos) {
        setCoordinates({ lat: Number(pos.lat), lng: Number(pos.lng) });
        if (address == null || address.length === 0) {
          setAddress(`lat: ${pos.lat}, lng: ${pos.lng}`);
        }
      }
    });

    markerRef.current = newMarker;

    map.setCenter(coordinates || defaultMapsContainerStartingLocation);
    map.setZoom(DEFAULT_ZOOM_CREATE_EVENT);

    return () => {
      newMarker.map = null;
    };
  }, [address, coordinates, map, setAddress, setCoordinates]);

  return (
    <div
      className="map-container-create-event"
      style={{ height: '250px', width: '100%' }}
    >
      <Map
        defaultZoom={DEFAULT_ZOOM_CREATE_EVENT}
        defaultCenter={coordinates || defaultMapsContainerStartingLocation}
        mapId={MAP_ID}
      />
    </div>
  );
};

export default DraggablePinMap;
