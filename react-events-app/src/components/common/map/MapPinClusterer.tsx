import React, { useEffect, useRef } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

const MapPinClusterer = ({
  map,
  markers,
}: {
  map: google.maps.Map;
  markers: google.maps.marker.AdvancedMarkerElement[];
}) => {
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map || clusterer.current) return;

    clusterer.current = new MarkerClusterer({
      map: map,
      markers: markers,
      algorithmOptions: { maxZoom: 15 },
      onClusterClick: (cluster) => {
        console.log('Cluster clicked', cluster);
      },
    });

    return () => {
      clusterer.current?.clearMarkers();
      clusterer.current = null;
    };
  }, [map, markers]);

  useEffect(() => {
    if (clusterer.current) {
      clusterer.current.clearMarkers();
      clusterer.current.addMarkers(markers);
    }
  }, [markers]);

  return null;
};

export default MapPinClusterer;
