import { useState, useEffect } from 'react';
import { EventDBProps, EventTableProps } from '../interfaces/types';
import { useTokens } from '../context/TokenContext';
import { useApi } from './useApi';
import { ApiEndpoints } from '../constants';
import { mapEventTableData } from '../utils/mapping';

export const useEventTableData = (
  newEventCreated: boolean,
  setNewEventCreated: (value: boolean) => void
) => {
  const [userEvents, setUserEvents] = useState<EventTableProps[]>([]);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState<
    string | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventTableProps | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdated, setModalUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { username, isAdmin } = useTokens();
  const { fetchWithTokens } = useApi();

  useEffect(() => {
    if (!username) {
      setErrorMessage('Username not found. No events to display.');
    } else {
      try {
        fetchWithTokens(
          isAdmin
            ? ApiEndpoints.GET_ALL_EVENTS
            : ApiEndpoints.GET_USER_EVENTS(username),
          { method: 'GET' }
        )
          .then((data: EventDBProps[]) => {
            setUserEvents(mapEventTableData(data));
            setModalUpdated(false);
            setNewEventCreated(false);
            setLoading(false);
          })
          .catch((error: any) => {
            console.error('Error fetching event list:', error);
            setErrorMessage('Error fetching event list.');
          });
      } catch (error) {
        setErrorMessage('Error fetching User Events.');
      }
    }
  }, [username, modalUpdated, newEventCreated]);

  useEffect(() => {
    if (newEventCreated || modalUpdated) {
      setLoading(true);
    }
  }, [newEventCreated, modalUpdated]);

  useEffect(() => {
    if (errorMessage) {
      setLoading(false);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (deleteSuccessMessage) {
      const timer = setTimeout(() => {
        setDeleteSuccessMessage(null);
      }, 4000); // 4 seconds
      return () => clearTimeout(timer);
    }
  }, [deleteSuccessMessage]);

  return {
    userEvents,
    deleteSuccessMessage,
    errorMessage,
    selectedEvent,
    modalOpen,
    loading,
    setDeleteSuccessMessage,
    setSelectedEvent,
    setModalOpen,
    setModalUpdated,
    setLoading,
    handleCloseModal: () => setModalOpen(false),
  };
};
