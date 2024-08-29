import React, { useEffect, useState } from 'react';
import { ApiEndpoints, PlaceTypes } from '../constants';
import { useApi } from '../hooks/useApi';
import { EventDBProps } from '../interfaces/types';
import { useDataContext } from '../context/DataContext';
import { mapEventData } from '../utils/mapping';
import StatusAlert from '../components/common/StatusAlert';
import HomeEventsContainer from '../components/layout/HomeEventsContainer';
import HomeEventsFilter from '../components/layout/HomeEventsFilter';

const Home = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
  const { eventData, setEventData, homePageFilterOpen } = useDataContext();
  const [selectedEventTypes, setSelectedEventTypes] = useState<String[]>([]);
  const [filterOn, setFilterOn] = useState(false);

  useEffect(() => {
    if (!filterOn) {
      fetchWithTokens(ApiEndpoints.GET_LATEST_EVENTS, { method: 'GET' })
        .then((data: EventDBProps[]) => {
          const mappedEvents = mapEventData(data);
          setEventData(mappedEvents);
        })
        .catch((error: any) =>
          setErrorMessage(
            'Error loading Event data. Apologies for the inconvenince.'
          )
        );
    }
  }, [setEventData, filterOn]);

  useEffect(() => {
    if (filterOn && selectedEventTypes.length === 0 && !homePageFilterOpen) {
      setFilterOn(false);
    }
  }, [filterOn, homePageFilterOpen, selectedEventTypes]);

  useEffect(() => {
    if (filterOn) {
      fetchWithTokens(
        ApiEndpoints.GET_EVENTS_BY_TYPE(selectedEventTypes.join(',')),
        { method: 'GET' }
      )
        .then((data: EventDBProps[]) => {
          if (data.length === 0) {
            setInfoMessage('No events found for the selected types.');
          }
          const mappedEvents = mapEventData(data);
          setEventData(mappedEvents);
        })
        .catch((error: any) =>
          setErrorMessage(
            'Error loading Event data. Apologies for the inconvenince.'
          )
        );
    }
  }, [setEventData, filterOn, selectedEventTypes]);

  useEffect(() => {
    if (errorMessage || infoMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
        setInfoMessage(null);
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [errorMessage, infoMessage]);

  const handleApplyFilter = (selectedTypes: PlaceTypes[]) => {
    if (selectedTypes.length === 0) {
      setInfoMessage('Please select at least one event type.');
      return;
    }
    setFilterOn(true);
    setSelectedEventTypes(selectedTypes.map((key) => key.toString()));
  };

  const handleResetFilter = () => {
    setFilterOn(false);
    setSelectedEventTypes([]);
  };

  return (
    <div>
      {homePageFilterOpen && (
        <HomeEventsFilter
          onApplyFilter={handleApplyFilter}
          onResetFilter={handleResetFilter}
        />
      )}
      {errorMessage && <StatusAlert message={errorMessage} severity="error" />}
      {infoMessage && <StatusAlert message={infoMessage} severity="info" />}
      <HomeEventsContainer eventData={eventData} />
    </div>
  );
};

export default Home;
