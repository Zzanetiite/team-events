import React from 'react';
import { DataGrid, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { NewEventCreatedProps } from '../../interfaces/types';
import {
  eventTableFormatting,
  tableAdminColumns,
  tableColumns,
} from '../../config';
import EventTableHeader from '../common/EventTableHeader';
import { useEventTableData } from '../../hooks/useEventTable';

const EventTable: React.FC<NewEventCreatedProps> = ({
  newEventCreated,
  setNewEventCreated,
  selectedEvent,
  setSelectedEvent,
}) => {
  const { user } = useAuth();
  const [selectionModel, setSelectionModel] =
    React.useState<GridRowSelectionModel>({
      type: 'include',
      ids: new Set<GridRowId>(),
    });
  const {
    userEvents,
    deleteSuccessMessage,
    errorMessage,
    loading,
    handleBulkDelete,
  } = useEventTableData(
    newEventCreated,
    setNewEventCreated,
    selectedEvent,
    setSelectedEvent,
    selectionModel,
    setSelectionModel
  );

  const columns = user.isAdmin
    ? tableAdminColumns({
        userEvents,
        setSelectedEvent,
      })
    : tableColumns({ userEvents, setSelectedEvent });
  const columnsFiltered = React.useMemo(
    () =>
      columns.filter((column) =>
        [
          'user',
          'eventTitle',
          'placeType',
          'address',
          'description',
          'link',
        ].includes(column.field)
      ),
    [columns]
  );

  return (
    <div>
      <Box sx={{ marginX: '20px' }}>
        <EventTableHeader
          deleteSuccessMessage={deleteSuccessMessage}
          errorMessage={errorMessage}
          selectionModel={selectionModel}
          handleBulkDelete={handleBulkDelete}
        />
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={userEvents}
            rowHeight={120}
            columns={columnsFiltered}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            loading={loading}
            sx={eventTableFormatting}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => {
              setSelectionModel(newSelection);
            }}
            showToolbar
          />
        </div>
      </Box>
    </div>
  );
};

export default EventTable;
