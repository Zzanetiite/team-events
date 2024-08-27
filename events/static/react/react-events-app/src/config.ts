import { PlaceTypes } from './constants';
import { EventTableProps } from './interfaces/types';

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
};
