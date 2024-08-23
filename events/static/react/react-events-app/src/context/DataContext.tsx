import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from 'react';
import { EventProps } from '../interfaces/types';

interface DataContextType {
  eventData: EventProps[];
  setEventData: React.Dispatch<React.SetStateAction<EventProps[]>>;
}

const DataContext = createContext<DataContextType | null>(null);

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [eventData, setEventData] = useState<EventProps[]>([]);
  useMemo(() => ({ eventData, setEventData }), [eventData]);

  return (
    <DataContext.Provider
      value={{
        eventData,
        setEventData,
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
