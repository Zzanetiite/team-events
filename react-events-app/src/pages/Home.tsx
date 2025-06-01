import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useDataContext } from '../context/DataContext';
import useFetchEvents from '../hooks/useFetchEvents';
import useAutoClearMessage from '../hooks/useAutoClearMessage';
import StatusAlert from '../components/common/StatusAlert';
import HomeEventsContainer from '../components/layout/HomeEventsContainer';
import HomeEventsFilter from '../components/layout/HomeEventsFilter';
import { PlaceTypes } from '../constants';
import HomeSearchingText from '../components/layout/HomeSearchingText';
import GoogleMap from '../components/common/map/GoogleMap';
import { EventProps } from '../interfaces/types';

const Home = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [eventDataLoading, setEventDataLoading] = useState(true);
  const { fetchWithTokens, loading } = useApi();
  const {
    eventData,
    setEventData,
    currentCoordinates,
    setCurrentCoordinates,
    currentLocation,
    setCurrentLocation,
  } = useDataContext();
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [filteredEventData, setFilteredEventData] = useState<EventProps[]>([]);

  useFetchEvents({
    selectedEventTypes,
    setErrorMessage,
    eventData,
    setEventData,
    setFilteredEventData,
    fetchWithTokens,
    currentCoordinates,
    setEventDataLoading,
  });

  useAutoClearMessage({ message: errorMessage, setMessage: setErrorMessage });
  useAutoClearMessage({ message: infoMessage, setMessage: setInfoMessage });

  const handleApplyFilter = (selectedTypes: PlaceTypes[]) => {
    if (selectedTypes.length === 0) {
      setInfoMessage('Please select at least one event type.');
      return;
    }
    setSelectedEventTypes(selectedTypes.map((key) => key.toString()));
  };

  const handleResetFilter = () => {
    setSelectedEventTypes([]);
  };

  return (
    <div>
      <HomeEventsFilter
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
      />
      {errorMessage && <StatusAlert message={errorMessage} severity="error" />}
      {infoMessage && <StatusAlert message={infoMessage} severity="info" />}
      <GoogleMap
        events={filteredEventData ?? eventData}
        setCurrentLocation={setCurrentLocation}
        currentCoordinates={currentCoordinates}
        setCurrentCoordinates={setCurrentCoordinates}
        loading={loading}
      />
      <HomeSearchingText
        loading={loading || eventDataLoading}
        currentLocation={currentLocation}
      />
      <HomeEventsContainer
        eventData={filteredEventData ?? eventData}
        loading={loading || eventDataLoading}
      />
    </div>
  );
};

export default Home;
