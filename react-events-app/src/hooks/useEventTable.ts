import { useState, useEffect } from 'react';
import { EventDBProps, EventProps } from '../interfaces/types';
import { useAuth } from '../context/AuthContext';
import { useApi } from './useApi';
import { ApiEndpoints } from '../constants';
import { mapEventData } from '../utils/mapping';
import useAutoClearMessage from './useAutoClearMessage';
import { GridRowSelectionModel } from '@mui/x-data-grid';

export const useEventTableData = (
  newEventCreatedUpdated: boolean,
  setNewEventCreatedUpdated: (value: boolean) => void,
  selectedEvent: EventProps | null,
  setSelectedEvent: React.Dispatch<React.SetStateAction<EventProps | null>>,
  selectionModel: GridRowSelectionModel,
  setSelectionModel: React.Dispatch<React.SetStateAction<GridRowSelectionModel>>
) => {
  const [userEvents, setUserEvents] = useState<EventProps[] | null>(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState<
    string | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { fetchWithTokens } = useApi();

  useEffect(() => {
    if (!loading && !user.username) {
      setErrorMessage('Username not found. No events to display.');
    } else if (user.username) {
      if (userEvents == null || newEventCreatedUpdated) {
        fetchWithTokens(
          user.isAdmin
            ? ApiEndpoints.GET_ALL_EVENTS
            : ApiEndpoints.GET_USER_EVENTS(user.username),
          { method: 'GET' }
        )
          .then((data: EventDBProps[]) => {
            setUserEvents(mapEventData(data));
            setNewEventCreatedUpdated(false);
            setSelectedEvent(null);
            setLoading(false);
          })
          .catch((error: any) => {
            console.error('Error fetching event list:', error);
            setErrorMessage('Error fetching event list.');
          });
      }
    }
  }, [
    user,
    newEventCreatedUpdated,
    setNewEventCreatedUpdated,
    fetchWithTokens,
    userEvents,
    setSelectedEvent,
    loading,
  ]);

  useEffect(() => {
    if (newEventCreatedUpdated) {
      setLoading(true);
    }
  }, [newEventCreatedUpdated]);

  useEffect(() => {
    if (errorMessage) {
      setLoading(false);
    }
  }, [errorMessage]);

  useAutoClearMessage({
    message: deleteSuccessMessage,
    setMessage: setDeleteSuccessMessage,
  });

  const deleteEventById = async (id: number | number) => {
    const response = await fetchWithTokens(
      ApiEndpoints.UPDATE_OR_DELETE_EVENT(id),
      {
        method: 'DELETE',
      }
    );
    return response;
  };

  const handleBulkDelete = async () => {
    const selectedIds = selectionModel.ids;

    if (selectedIds.size === 0) return;

    const selectedEvents = userEvents
      ? userEvents.filter((event) => selectedIds.has(event.id))
      : [];

    const successIds: (string | number)[] = [];
    const failedIds: (string | number)[] = [];

    for (const event of selectedEvents) {
      try {
        const response = await deleteEventById(event.id);

        if (response.deleted) {
          successIds.push(event.id);
        } else {
          failedIds.push(event.id);
        }
      } catch (err) {
        failedIds.push(event.id);
      }
    }

    // Build messages
    if (successIds.length > 0) {
      setDeleteSuccessMessage(
        `${successIds.length} event(s) deleted successfully.`
      );
    }

    if (failedIds.length > 0) {
      setErrorMessage(
        `Failed to delete ${failedIds.length} event(s): ${failedIds.join(', ')}.`
      );
    }

    if (successIds.length > 0) {
      setNewEventCreatedUpdated(true); // Refresh list only if something was deleted
    }

    // Clear selection
    setSelectionModel({ type: 'include', ids: new Set() });
  };

  return {
    userEvents,
    deleteSuccessMessage,
    errorMessage,
    selectedEvent,
    loading,
    setDeleteSuccessMessage,
    setSelectedEvent,
    handleBulkDelete,
  };
};
