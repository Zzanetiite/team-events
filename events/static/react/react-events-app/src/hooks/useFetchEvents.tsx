import { useEffect } from 'react';
import { ApiEndpoints } from '../constants';
import { EventDBProps } from '../interfaces/types';
import { mapEventData } from '../utils/mapping';
import { handleError } from '../errors/handleError';
import { FetchEventsProps } from '../interfaces/hookTypes';

const useFetchEvents = ({
  filterOn,
  selectedEventTypes,
  setErrorMessage,
  setEventData,
  fetchWithTokens,
}: FetchEventsProps) => {
  useEffect(() => {
    if (!filterOn) {
      fetchWithTokens(ApiEndpoints.GET_LATEST_EVENTS, { method: 'GET' })
        .then((data: EventDBProps[]) => {
          const mappedEvents = mapEventData(data);
          setEventData(mappedEvents);
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
  }, [filterOn, setEventData, setErrorMessage, fetchWithTokens]);

  useEffect(() => {
    if (filterOn) {
      fetchWithTokens(
        ApiEndpoints.GET_EVENTS_BY_TYPE(selectedEventTypes.join(',')),
        { method: 'GET' }
      )
        .then((data: EventDBProps[]) => {
          if (data.length === 0) {
            setErrorMessage('No events found for the selected types.');
          }
          const mappedEvents = mapEventData(data);
          setEventData(mappedEvents);
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
    filterOn,
    selectedEventTypes,
    setEventData,
    fetchWithTokens,
    setErrorMessage,
  ]);
};

export default useFetchEvents;
