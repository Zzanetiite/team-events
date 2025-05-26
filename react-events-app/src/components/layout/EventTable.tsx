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
import EditEventModal from './EditEventModal';
import EventTableHeader from '../common/EventTableHeader';
import { useEventTableData } from '../../hooks/useEventTable';

const EventTable: React.FC<NewEventCreatedProps> = ({
  newEventCreated,
  setNewEventCreated,
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
    selectedEvent,
    modalOpen,
    loading,
    setDeleteSuccessMessage,
    setSelectedEvent,
    setModalOpen,
    setModalUpdated,
    handleCloseModal,
    handleBulkDelete,
  } = useEventTableData(
    newEventCreated,
    setNewEventCreated,
    selectionModel,
    setSelectionModel
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
            columns={
              user.isAdmin
                ? tableAdminColumns({
                    userEvents,
                    setSelectedEvent,
                    setModalOpen,
                  })
                : tableColumns({ userEvents, setSelectedEvent, setModalOpen })
            }
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
          />
        </div>
      </Box>
      <EditEventModal
        open={modalOpen}
        handleClose={handleCloseModal}
        selectedEvent={selectedEvent}
        setModalUpdated={setModalUpdated}
        setDeleteSuccessMessage={setDeleteSuccessMessage}
      />
    </div>
  );
};

export default EventTable;
