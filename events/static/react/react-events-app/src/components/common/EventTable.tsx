import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Alert, Box, Button, Typography } from '@mui/material';
import { ApiEndpoints } from '../../constants';
import { useApi } from '../../hooks/useApi';
import { useTokens } from '../../context/TokenContext';
import { EventDBProps, EventTableProps } from '../../interfaces/types';
import { eventTableFormatting } from '../config';
import { mapEventTableData } from '../../utils/mapping';
import EditEventModal from '../layout/EditEventModal';

export default function EventTable() {
  const [userEvents, setUserEvents] = useState<EventTableProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventTableProps | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdated, setModalUpdated] = useState(false);
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
          })
          .catch((error: any) => {
            console.error('Error fetching User Events:', error);
            setErrorMessage('Error fetching User Events.');
          });
      } catch (error) {
        setErrorMessage('Error fetching User Events.');
      }
    }
  }, [username, setUserEvents, modalUpdated]);

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Event Title',
      width: 200,
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              const event = userEvents.find((e) => e.id === params.row.id);
              if (event) {
                setSelectedEvent(event);
                setModalOpen(true);
              }
              setModalOpen(true);
            }}
            sx={{ textTransform: 'none' }}
          >
            {params.value}
          </Button>
        );
      },
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
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Box sx={{ marginX: '20px' }}>
        <Typography component="legend" variant="h5" gutterBottom>
          Events created by you
        </Typography>
        <Typography component="legend" variant="body2" gutterBottom>
          Click on an event to edit it.
        </Typography>
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
            // loading={true} // TODO If 0 rows, show no DATA. If loading data, show loading spinner.
            sx={eventTableFormatting}
          />
        </div>
      </Box>
      <EditEventModal
        open={modalOpen}
        handleClose={handleCloseModal}
        event={selectedEvent}
        setModalUpdated={setModalUpdated}
      />
    </div>
  );
}
