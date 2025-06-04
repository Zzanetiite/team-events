import { useEffect, useRef } from 'react';
import { ApiEndpoints } from '../constants';
import { EventDBProps } from '../interfaces/types';
import { mapEventData } from '../utils/mapping';
import { handleError } from '../errors/handleError';
import { FetchEventsProps } from '../interfaces/hookTypes';

const useFetchEvents = ({
  selectedEventTypes,
  setErrorMessage,
  eventData,
  setEventData,
  setFilteredEventData,
  fetchWithTokens,
  currentCoordinates,
  setEventDataLoading,
}: FetchEventsProps) => {
  // Track previous coordinates to reduce unecessary API calls
  const previousCoordinatesRef = useRef<null | typeof currentCoordinates>(null);

  useEffect(() => {
    const coordsChanged =
      previousCoordinatesRef.current?.lat !== currentCoordinates?.lat ||
      previousCoordinatesRef.current?.lng !== currentCoordinates?.lng;

    if (
      selectedEventTypes.length === 0 &&
      currentCoordinates &&
      coordsChanged
    ) {
      const { lat, lng } = currentCoordinates;
      const default_radius_km = 30;

      const url = `${ApiEndpoints.GET_NEARBY_EVENTS}?lat=${lat}&lng=${lng}&radius_km=${default_radius_km}`;
      fetchWithTokens(url, { method: 'GET' })
        .then((data: EventDBProps[]) => {
          const mappedEvents = mapEventData(data);
          setEventData(mappedEvents);
          setFilteredEventData(null);
          setEventDataLoading(false);
          previousCoordinatesRef.current = currentCoordinates;
        })
        .catch((error: any) =>
          handleError({
            error,
            setErrorMessage,
            overrideErrorHandlers: {
              403: (setErrorMessage) => {
                setErrorMessage('Error loading Event data.');
              },
            },
          })
        )
        .finally(() => {
          setEventDataLoading(false);
        });
    }
  }, [
    setEventData,
    setErrorMessage,
    fetchWithTokens,
    currentCoordinates,
    setEventDataLoading,
    setFilteredEventData,
    selectedEventTypes.length,
  ]);

  // Handle filtered events
  useEffect(() => {
    // If we already have data, filter it on the frontend
    if (currentCoordinates && eventData.length > 0) {
      let filteredEvents;
      if (selectedEventTypes.length > 0) {
        filteredEvents = eventData.filter((event) =>
          selectedEventTypes.includes(event.placeType)
        );
      } else {
        filteredEvents = eventData;
      }

      if (filteredEvents.length === 0) {
        setErrorMessage('No events found for the selected types.');
      }
      setFilteredEventData(filteredEvents);
      setEventDataLoading(false);
    } else if (selectedEventTypes.length > 0) {
      let url = ApiEndpoints.GET_EVENTS_BY_TYPE(selectedEventTypes.join(','));

      if (currentCoordinates) {
        const { lat, lng } = currentCoordinates;
        const default_radius_km = 30;
        url += `?lat=${lat}&lng=${lng}&radius_km=${default_radius_km}`;
      }

      fetchWithTokens(url, { method: 'GET' })
        .then((data: EventDBProps[]) => {
          if (data.length === 0) {
            setErrorMessage('No events found for the selected types.');
          }
          const mappedEvents = mapEventData(data);
          setEventData(mappedEvents);
          setEventDataLoading(false);
        })
        .catch((error: any) =>
          handleError({
            error,
            setErrorMessage,
            messageForBadRequest: 'No events found for the selected types.',
            overrideErrorHandlers: {
              403: (setErrorMessage) => {
                setErrorMessage(
                  'Error loading Event data. Please try clearing site cookies.'
                );
              },
            },
          })
        );
    }
  }, [
    selectedEventTypes,
    setEventData,
    fetchWithTokens,
    setErrorMessage,
    setEventDataLoading,
    currentCoordinates,
    eventData,
    setFilteredEventData,
  ]);
};

export default useFetchEvents;
