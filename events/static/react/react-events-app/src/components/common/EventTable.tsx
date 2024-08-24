import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { eventTableDummyRows, eventTableFormatting } from '../config';

export default function EventTable() {
  const navigate = useNavigate();
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
            onClick={() => navigate(`/event/${params.row.id}`)}
            sx={{ textTransform: 'none' }} // Optional: prevents text from being uppercased
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
    <Box sx={{ marginX: '20px' }}>
      <Typography component="legend" variant="h5" gutterBottom>
        Events created by you
      </Typography>
      <Typography component="legend" variant="body2" gutterBottom>
        Click on an event to edit it.
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={eventTableDummyRows}
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
  );
}
