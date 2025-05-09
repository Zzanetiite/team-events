import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useDataContext } from '../context/DataContext';
import useFetchEvents from '../hooks/useFetchEvents';
import useEventFilter from '../hooks/useEventFilter';
import useAutoClearMessage from '../hooks/useAutoClearMessage';
import StatusAlert from '../components/common/StatusAlert';
import HomeEventsContainer from '../components/layout/HomeEventsContainer';
import HomeEventsFilter from '../components/layout/HomeEventsFilter';
import { PlaceTypes } from '../constants';
import { UNKNOWN_LOCATION } from '../constants/MapConstants';
import HomeSearchingText from '../components/layout/HomeSearchingText';
import GoogleMap from '../components/layout/GoogleMap';

const Home = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] =
    useState<string>(UNKNOWN_LOCATION);
  const { fetchWithTokens, loading } = useApi();
  const { eventData, setEventData, homePageFilterOpen } = useDataContext();
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [filterOn, setFilterOn] = useEventFilter({
    homePageFilterOpen,
    selectedEventTypes,
  });

  useFetchEvents({
    filterOn,
    selectedEventTypes,
    setErrorMessage,
    setEventData,
    fetchWithTokens,
  });

  useAutoClearMessage({ message: errorMessage, setMessage: setErrorMessage });
  useAutoClearMessage({ message: infoMessage, setMessage: setInfoMessage });

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
      <GoogleMap events={eventData} setCurrentLocation={setCurrentLocation} />
      <HomeSearchingText loading={loading} currentLocation={currentLocation} />
      <HomeEventsContainer eventData={eventData} />
    </div>
  );
};

export default Home;
