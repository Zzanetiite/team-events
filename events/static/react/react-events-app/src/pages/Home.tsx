import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useDataContext } from '../context/DataContext';
import useFetchEvents from '../hooks/useFetchEvents';
import useEventFilter from '../hooks/useEventFilter';
import useAutoClearMessage from '../hooks/useAutoClearMessage';
import StatusAlert from '../components/common/StatusAlert';
import HomeEventsContainer from '../components/layout/HomeEventsContainer';
import HomeEventsFilter from '../components/layout/HomeEventsFilter';
import {
  REACT_APP_MAP_ENABLED,
  PlaceTypes,
  REACT_APP_GOOGLE_MAPS_API_KEY,
} from '../constants';
import GoogleMap from '../components/layout/GoogleMap';

const Home = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const { fetchWithTokens } = useApi();
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
  console.log('map enabled', REACT_APP_MAP_ENABLED);
  console.log('key', REACT_APP_GOOGLE_MAPS_API_KEY);
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
      {REACT_APP_MAP_ENABLED === 'true' && <GoogleMap events={eventData} />}
      <HomeEventsContainer eventData={eventData} />
    </div>
  );
};

export default Home;
