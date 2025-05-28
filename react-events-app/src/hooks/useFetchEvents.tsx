import { useEffect, useRef } from 'react';
import { ApiEndpoints } from '../constants';
import { EventDBProps } from '../interfaces/types';
import { mapEventData } from '../utils/mapping';
import { handleError } from '../errors/handleError';
import { FetchEventsProps } from '../interfaces/hookTypes';

const useFetchEvents = ({
  filterOn,
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

    if (!filterOn && currentCoordinates && coordsChanged) {
      const { lat, lng } = currentCoordinates;
      const default_radius_km = 30;

      const url = `${ApiEndpoints.GET_NEARBY_EVENTS}?lat=${lat}&lng=${lng}&radius_km=${default_radius_km}`;
      fetchWithTokens(url, { method: 'GET' })
        .then((data: EventDBProps[]) => {
          const mappedEvents = mapEventData(data);
          setEventData(mappedEvents);
          setFilteredEventData(null);
          setEventDataLoading(false);
        })
        .catch((error: any) =>
          handleError({
            error,
            setErrorMessage,
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
    filterOn,
    setEventData,
    setErrorMessage,
    fetchWithTokens,
    currentCoordinates,
    setEventDataLoading,
    setFilteredEventData,
  ]);

  // Handle filtered events
  useEffect(() => {
    if (filterOn) {
      setEventDataLoading(true);

      // If we already have data, filter it on the frontend
      if (eventData.length > 0) {
        const filteredEvents = eventData.filter((event) =>
          selectedEventTypes.includes(event.placeType)
        );

        if (filteredEvents.length === 0) {
          setErrorMessage('No events found for the selected types.');
        }
        setFilteredEventData(filteredEvents);
        setEventDataLoading(false);
      } else {
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
    }
  }, [
    filterOn,
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
