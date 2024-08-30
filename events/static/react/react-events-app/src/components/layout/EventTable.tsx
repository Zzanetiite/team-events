import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useTokens } from '../../context/TokenContext';
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
  const { isAdmin } = useTokens();
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
  } = useEventTableData(newEventCreated, setNewEventCreated);

  return (
    <div>
      <Box sx={{ marginX: '20px' }}>
        <EventTableHeader
          deleteSuccessMessage={deleteSuccessMessage}
          errorMessage={errorMessage}
        />
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={userEvents}
            columns={
              isAdmin
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
