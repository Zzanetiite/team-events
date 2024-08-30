import { GridColDef } from '@mui/x-data-grid';
import { PlaceTypes } from './constants';
import { EventTableProps, TableColumnProps } from './interfaces/types';
import { renderEventCell } from './utils/renderEventCell';
import styled from '@emotion/styled';
import { Rating } from '@mui/material';

export const eventTableFormatting = {
  '& .MuiDataGrid-root': {
    borderRadius: '10px',
    borderColor: 'transparent',
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#b3e5fc',
    color: '#000',
    fontWeight: 'bold',
    borderRadius: '10px 10px 0 0',
  },
  '& .MuiDataGrid-cell': {
    borderColor: '#e0f7fa',
  },
  '& .MuiDataGrid-row:nth-of-type(odd)': {
    backgroundColor: '#f0f8ff',
  },
  '& .MuiDataGrid-row:nth-of-type(even)': {
    backgroundColor: '#fff',
  },
};

export const eventEmptyData: EventTableProps = {
  id: 0,
  title: '',
  eventType: PlaceTypes.TEAM_BUILDING,
  address: '',
  description: '',
  user: '',
};

export const tableColumns = ({
  userEvents,
  setSelectedEvent,
  setModalOpen,
}: TableColumnProps): GridColDef[] => {
  return [
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
};

export const tableAdminColumns = ({
  userEvents,
  setSelectedEvent,
  setModalOpen,
}: TableColumnProps): GridColDef[] => {
  return [
    {
      field: 'title',
      headerName: 'Event Title',
      width: 200,
      renderCell: renderEventCell(userEvents, setSelectedEvent, setModalOpen),
    },
    {
      field: 'user',
      headerName: 'Creator',
      width: 130,
    },
    { field: 'eventType', headerName: 'Type', width: 130 },
    { field: 'address', headerName: 'Address', width: 250 },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
    },
  ];
};

export const StyledLoudnessRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#33a1b0',
  },
  '& .MuiRating-iconHover': {
    color: '#cdf0f4',
  },
});
