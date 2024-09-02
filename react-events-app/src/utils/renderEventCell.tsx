import React from 'react';
import { GridCellParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { EventProps } from '../interfaces/types';

export const renderEventCell =
  (
    userEvents: any[],
    setSelectedEvent: (event: any) => void,
    setModalOpen: (open: boolean) => void
  ) =>
  (params: GridCellParams) => {
    const value = params.value as string;
    return (
      <Button
        variant="text"
        color="primary"
        onClick={() => {
          const event = userEvents.find((e) => e.id === params.row.id);
          if (event) {
            setSelectedEvent(event);
          }
          setModalOpen(true);
        }}
        sx={{ textTransform: 'none' }}
      >
        {value}
      </Button>
    );
  };

export const renderAddressCell =
  (userEvents: EventProps[]) => (params: GridCellParams<EventProps>) => {
    const event = userEvents.find((e) => e.id === params.row.id);
    return (
      <div>{event ? event.location.address : 'Address not available'}</div>
    );
  };
