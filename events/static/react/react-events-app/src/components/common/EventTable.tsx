import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Alert, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ApiEndpoints } from '../../constants';
import { useApi } from '../../hooks/useApi';
import { useTokens } from '../../context/TokenContext';
import { EventDBProps, EventTableProps } from '../../interfaces/types';
import { eventTableFormatting } from '../config';
import { mapEventTableData } from '../../utils/mapping';

export default function EventTable() {
  const [userEvents, setUserEvents] = useState<EventTableProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { username } = useTokens();
  const navigate = useNavigate();
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
  }, [username, setUserEvents]);

  const columns: GridColDef[] = [
    {
      field: 'eventTitle',
      headerName: 'Event Title',
      width: 200,
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate(`/event/${params.row.id}`)} // TODO: set up links for event ids
            sx={{ textTransform: 'none' }}
          >
            {params.value}
          </Button>
        );
      },
    },
    { field: 'placeType', headerName: 'Type', width: 130 },
    { field: 'address', headerName: 'Address', width: 250 },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
    },
  ];
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
    </div>
  );
}
