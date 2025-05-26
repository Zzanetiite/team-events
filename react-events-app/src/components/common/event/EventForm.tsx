import React from 'react';
import EventTitleInput from '../input/EventTitleInput';
import EventAddressInput from '../input/EventAddressInput';
import EventDescriptionInput from '../input/EventDescriptionInput';
import EventPlaceTypeInput from '../input/EventPlaceTypeInput';
import { EventFormProps } from '../../../interfaces/types';

const EventForm: React.FC<EventFormProps> = ({
  data,
  handleChange,
  handleSelectChange,
  handleLocationChange,
  submitClicked,
  setSubmitClicked,
  loading,
}) => {
  return (
    <>
      <EventTitleInput
        value={data.eventTitle}
        onChange={handleChange}
        loading={loading}
      />
      <EventAddressInput
        value={data.location}
        onChange={handleLocationChange}
        submitClicked={submitClicked ? submitClicked : false}
        setSubmitClicked={setSubmitClicked ? setSubmitClicked : () => {}}
        loading={loading}
      />
      <EventDescriptionInput
        value={data.description}
        onChange={handleChange}
        loading={loading}
      />
      <EventPlaceTypeInput
        value={data.placeType}
        onChange={handleSelectChange}
        loading={loading}
      />
    </>
  );
};

export default EventForm;
