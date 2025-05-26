import { GridColDef } from '@mui/x-data-grid';
import { PlaceTypes } from './constants';
import { EventProps, TableColumnProps } from './interfaces/types';
import { renderAddressCell, renderEventCell } from './utils/renderEventCell';
import styled from '@emotion/styled';
import { Rating } from '@mui/material';
import { Libraries } from '@react-google-maps/api';

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
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    lineHeight: '1.2em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
  },
  '& .MuiDataGrid-row:nth-of-type(odd)': {
    backgroundColor: '#f0f8ff',
  },
  '& .MuiDataGrid-row:nth-of-type(even)': {
    backgroundColor: '#fff',
  },
  '& .MuiDataGrid-cell.MuiDataGrid-cell--checkbox': {
    justifyContent: 'center',
  },
  '& .MuiDataGrid-columnHeader.MuiDataGrid-columnHeader--checkbox': {
    justifyContent: 'center',
  },
};

export const eventEmptyData: EventProps = {
  id: 0,
  eventTitle: '',
  placeType: PlaceTypes.TEAM_BUILDING,
  location: {
    address: '',
    location: {
      lat: 0,
      lng: 0,
    },
  },
  description: '',
  user: '',
  placeRating: 0,
  loudnessRating: 0,
  usersPlaceRating: null,
  usersLoudnessRating: null,
  comments: [],
};

const baseColumns = ({
  userEvents,
  setSelectedEvent,
  setModalOpen,
}: TableColumnProps): GridColDef[] => [
  {
    field: 'eventTitle',
    headerName: 'Event Title',
    width: 200,
    renderCell: renderEventCell(userEvents, setSelectedEvent, setModalOpen),
  },
  { field: 'placeType', headerName: 'Type', width: 130 },
  {
    field: 'address',
    headerName: 'Address',
    width: 250,
    renderCell: renderAddressCell(userEvents),
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 300,
  },
];

export const tableColumns = (props: TableColumnProps): GridColDef[] => {
  return baseColumns(props);
};

export const tableAdminColumns = (props: TableColumnProps): GridColDef[] => {
  const columns = baseColumns(props);
  return [
    ...columns.slice(0, 1), // Include 'eventTitle' column
    {
      field: 'user',
      headerName: 'Creator',
      width: 130,
    },
    ...columns.slice(1), // Include remaining columns
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

// Google Map settings
// Google API library for place search
export const libraries: Libraries = ['places', 'marker', 'maps', 'geocoding'];

export const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

export const defaultMapsContainerStartingLocation = {
  // Cambridge, UK
  lat: 52.19105,
  lng: 0.13502,
};
