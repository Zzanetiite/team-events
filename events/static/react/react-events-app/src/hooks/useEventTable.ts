import { useState, useEffect } from 'react';
import { EventDBProps, EventProps } from '../interfaces/types';
import { useAuth } from '../context/AuthContext';
import { useApi } from './useApi';
import { ApiEndpoints } from '../constants';
import { mapEventData } from '../utils/mapping';
import useAutoClearMessage from './useAutoClearMessage';

export const useEventTableData = (
  newEventCreated: boolean,
  setNewEventCreated: (value: boolean) => void
) => {
  const [userEvents, setUserEvents] = useState<EventProps[]>([]);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState<
    string | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdated, setModalUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { fetchWithTokens } = useApi();

  useEffect(() => {
    if (!user.username) {
      setErrorMessage('Username not found. No events to display.');
    } else {
      try {
        fetchWithTokens(
          user.isAdmin
            ? ApiEndpoints.GET_ALL_EVENTS
            : ApiEndpoints.GET_USER_EVENTS(user.username),
          { method: 'GET' }
        )
          .then((data: EventDBProps[]) => {
            setUserEvents(mapEventData(data));
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
  }, [user, modalUpdated, newEventCreated]);

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

  useAutoClearMessage({
    message: deleteSuccessMessage,
    setMessage: setDeleteSuccessMessage,
  });

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
