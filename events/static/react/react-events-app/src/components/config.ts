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

export const eventTableDummyRows = [
  {
    id: 1,
    eventTitle: 'Music Concert',
    placeType: 'Concert Hall',
    address: '1234 Main St, Springfield',
    description: 'A grand music concert with live bands.',
  },
  {
    id: 2,
    eventTitle: 'Art Exhibition',
    placeType: 'Gallery',
    address: '5678 Elm St, Springfield',
    description: 'Exhibition showcasing modern art pieces.',
  },
  {
    id: 3,
    eventTitle: 'Tech Conference',
    placeType: 'Convention Center',
    address: '9012 Oak St, Springfield',
    description: 'Annual conference on the latest in tech.',
  },
  {
    id: 4,
    eventTitle: 'Food Festival',
    placeType: 'Outdoor Park',
    address: '3456 Pine St, Springfield',
    description: 'A variety of food stalls offering gourmet experiences.',
  },
  {
    id: 5,
    eventTitle: 'Book Fair',
    placeType: 'Library',
    address: '7890 Cedar St, Springfield',
    description: 'A collection of books from various genres.',
  },
];
