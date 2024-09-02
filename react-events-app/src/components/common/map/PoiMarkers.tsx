import React, { useEffect, useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { PoiMarkerProps } from '../../../interfaces/types';

const PoiMarkers: React.FC<PoiMarkerProps> = ({ events }) => {
  const map = useMap();
  const markersRef = useRef<google.maps.Marker[]>([]);
  const clusterer = useRef<MarkerClusterer | null>(null);
  const infoWindow = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (map && !clusterer.current) {
      clusterer.current = new MarkerClusterer({ map, markers: [] });
    }
  }, [map]);

  useEffect(() => {
    if (!map) return;

    markersRef.current.forEach((marker) => marker.setMap(null));

    const newMarkers = events.map((event) => {
      const marker = new google.maps.Marker({
        position: event.location.location,
        map: map,
      });

      marker.addListener('click', () => {
        if (infoWindow.current) {
          infoWindow.current.close();
        }

        infoWindow.current = new google.maps.InfoWindow({
          headerContent: event.eventTitle,
          content: `
            <div class="info-window">
            <p>${event.description}</p>
            <p class="address">${event.location.address}</p>
            </div>
        `,
          position: event.location.location,
        });
        infoWindow.current.open(map, marker);
      });

      return marker;
    });

    markersRef.current = newMarkers;

    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map, markers: newMarkers });
    } else {
      clusterer.current.clearMarkers();
      clusterer.current.addMarkers(newMarkers);
    }

    return () => {
      newMarkers.forEach((marker) => marker.setMap(null));
    };
  }, [map, events]);

  return null;
};

export default PoiMarkers;
