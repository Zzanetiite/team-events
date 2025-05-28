import React, { createContext, useState, useContext, ReactNode } from 'react';
import { EventProps } from '../interfaces/types';

interface DataContextType {
  eventData: EventProps[];
  setEventData: React.Dispatch<React.SetStateAction<EventProps[]>>;
  currentLocation: string | null;
  setCurrentLocation: React.Dispatch<React.SetStateAction<string | null>>;
  currentCoordinates: google.maps.LatLngLiteral | null;
  setCurrentCoordinates: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral | null>
  >;
}

const DataContext = createContext<DataContextType | null>(null);

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [eventData, setEventData] = useState<EventProps[]>([]);

  const [currentLocation, setCurrentLocation] = useState<string | null>(() => {
    return localStorage.getItem('currentLocation');
  });

  const [currentCoordinates, setCurrentCoordinates] =
    useState<google.maps.LatLngLiteral | null>(() => {
      const stored = localStorage.getItem('currentCoordinates');
      return stored ? JSON.parse(stored) : null;
    });

  // Persist changes
  React.useEffect(() => {
    if (currentLocation) {
      localStorage.setItem('currentLocation', currentLocation);
    }
  }, [currentLocation]);

  React.useEffect(() => {
    if (currentCoordinates) {
      localStorage.setItem(
        'currentCoordinates',
        JSON.stringify(currentCoordinates)
      );
    }
  }, [currentCoordinates]);

  return (
    <DataContext.Provider
      value={{
        eventData,
        setEventData,
        currentCoordinates,
        setCurrentCoordinates,
        currentLocation,
        setCurrentLocation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext(): DataContextType {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error(
      'useDataContext must be used within a DataContextProvider Context'
    );
  }
  return context;
}
