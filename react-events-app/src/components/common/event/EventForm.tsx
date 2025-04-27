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
}) => {
  return (
    <>
      <EventTitleInput value={data.eventTitle} onChange={handleChange} />
      <EventAddressInput
        value={data.location}
        onChange={handleLocationChange}
        submitClicked={submitClicked ? submitClicked : false}
        setSubmitClicked={setSubmitClicked ? setSubmitClicked : () => {}}
      />
      <EventDescriptionInput value={data.description} onChange={handleChange} />
      <EventPlaceTypeInput
        value={data.placeType}
        onChange={handleSelectChange}
      />
    </>
  );
};

export default EventForm;
