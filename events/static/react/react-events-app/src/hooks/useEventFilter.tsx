import { useEffect, useState } from 'react';
import { useEventFilterProps } from '../interfaces/hookTypes';

const useEventFilter = ({
  homePageFilterOpen,
  selectedEventTypes,
}: useEventFilterProps) => {
  const [filterOn, setFilterOn] = useState<boolean>(false);

  useEffect(() => {
    if (filterOn && selectedEventTypes.length === 0 && !homePageFilterOpen) {
      setFilterOn(false);
    }
  }, [filterOn, homePageFilterOpen, selectedEventTypes]);

  return [filterOn, setFilterOn] as const;
};

export default useEventFilter;
