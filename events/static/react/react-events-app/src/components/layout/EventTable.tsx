import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { ApiEndpoints } from '../../constants';
import { useApi } from '../../hooks/useApi';
import { useTokens } from '../../context/TokenContext';
import {
  EventDBProps,
  EventTableProps,
  NewEventCreatedProps,
} from '../../interfaces/types';
import { eventTableFormatting } from '../../config';
import { mapEventTableData } from '../../utils/mapping';
import EditEventModal from './EditEventModal';
import StatusAlert from '../common/StatusAlert';
import { renderEventCell } from '../../utils/renderEventCell';

const EventTable: React.FC<NewEventCreatedProps> = ({
  newEventCreated,
  setNewEventCreated,
}) => {
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
  const { username } = useTokens();
  const { fetchWithTokens } = useApi();

  useEffect(() => {
    if (!username) {
      setErrorMessage('Username not found. No events to display.');
    } else {
      try {
        fetchWithTokens(ApiEndpoints.GET_USER_EVENTS(username), {
          method: 'GET',
        })
          .then((data: EventDBProps[]) => {
            setUserEvents(mapEventTableData(data));
            setModalUpdated(false);
            setNewEventCreated(false);
            setLoading(false);
          })
          .catch((error: any) => {
            console.error('Error fetching User Events:', error);
            setErrorMessage('Error fetching User Events.');
          });
      } catch (error) {
        setErrorMessage('Error fetching User Events.');
      }
    }
  }, [
    username,
    setUserEvents,
    modalUpdated,
    newEventCreated,
    setNewEventCreated, // fetchWithTokens causes a cyclic dependency
  ]);

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

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Event Title',
      width: 200,
      renderCell: renderEventCell(userEvents, setSelectedEvent, setModalOpen),
    },
    { field: 'eventType', headerName: 'Type', width: 130 },
    { field: 'address', headerName: 'Address', width: 250 },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
    },
  ];

  const handleCloseModal = (): void => {
    setModalOpen(false);
  };

  return (
    <div>
      {errorMessage && <StatusAlert message={errorMessage} severity="error" />}
      <Box sx={{ marginX: '20px' }}>
        <Typography component="legend" variant="h5" gutterBottom>
          Events created by you
        </Typography>
        <Typography component="legend" variant="body2" gutterBottom>
          Click on an event to edit it.
        </Typography>
        {deleteSuccessMessage && (
          <StatusAlert message={deleteSuccessMessage} severity="success" />
        )}
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={userEvents}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            loading={loading}
            sx={eventTableFormatting}
          />
        </div>
      </Box>
      <EditEventModal
        open={modalOpen}
        handleClose={handleCloseModal}
        event={selectedEvent}
        setModalUpdated={setModalUpdated}
        setDeleteSuccessMessage={setDeleteSuccessMessage}
      />
    </div>
  );
};

export default EventTable;
