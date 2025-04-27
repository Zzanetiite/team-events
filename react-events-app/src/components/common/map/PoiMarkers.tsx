import React, { useEffect, useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { PoiMarkerProps } from '../../../interfaces/types';

const PoiMarkers: React.FC<PoiMarkerProps> = ({ events }) => {
  const map = useMap();
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const infoWindow = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (!map) return;

    markersRef.current.forEach((marker) => {
      marker.map = null;
    });

    const newMarkers = events.map((event) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: event.location.location,
        map: map,
        gmpClickable: true,
        gmpDraggable: false,
        title: event.eventTitle,
      });

      // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
      google.maps.event.addListener(marker, 'click', () => {
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

    return () => {
      newMarkers.forEach((marker) => (marker.map = null));
    };
  }, [map, events]);

  return null;
};

export default PoiMarkers;
