import React, { useState } from 'react';
import { PlaceTypes } from '../../constants';
import { Box } from '@mui/material';
import ResetButton from '../common/ResetButton';
import ApplyButton from '../common/buttons/ApplyButton';
import EventTypeSelect from '../common/EventTypeSelect';

interface HomeEventsFilterProps {
  onApplyFilter: (selectedTypes: PlaceTypes[]) => void;
  onResetFilter: () => void;
}

const HomeEventsFilter = ({
  onApplyFilter,
  onResetFilter,
}: HomeEventsFilterProps) => {
  const [selectedTypes, setSelectedTypes] = useState<{
    [key in PlaceTypes]?: boolean;
  }>({});

  const handleCheckboxChange = (type: PlaceTypes) => {
    setSelectedTypes((prevSelectedTypes) => ({
      ...prevSelectedTypes,
      [type]: !prevSelectedTypes[type],
    }));
  };

  const handleApply = () => {
    const selectedTypeKeys = Object.keys(selectedTypes).filter(
      (key) => selectedTypes[key as PlaceTypes]
    ) as PlaceTypes[];
    onApplyFilter(selectedTypeKeys);
  };

  const handleReset = () => {
    setSelectedTypes({});
    onResetFilter();
  };

  return (
    <div>
      <Box padding={1}>
        <EventTypeSelect
          selectedTypes={selectedTypes}
          handleCheckboxChange={handleCheckboxChange}
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <ApplyButton handleApply={handleApply} />
          <ResetButton handleReset={handleReset} />
        </Box>
      </Box>
    </div>
  );
};

export default HomeEventsFilter;
