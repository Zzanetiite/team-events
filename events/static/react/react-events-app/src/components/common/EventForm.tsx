import React from 'react';
import EventTitleInput from './input/EventTitleInput';
import EventAddressInput from './input/EventAddressInput';
import EventDescriptionInput from './input/EventDescriptionInput';
import EventPlaceTypeInput from './input/EventPlaceTypeInput';
import { EventFormProps } from '../../interfaces/types';

const EventForm: React.FC<EventFormProps> = ({
  data,
  handleChange,
  handleSelectChange,
  submitClicked,
  setSubmitClicked,
}) => {
  return (
    <>
      <EventTitleInput value={data.title} onChange={handleChange} />
      <EventAddressInput
        value={data.address}
        onChange={handleChange}
        submitClicked={submitClicked ? submitClicked : false}
        setSubmitClicked={setSubmitClicked ? setSubmitClicked : () => {}}
      />
      <EventDescriptionInput value={data.description} onChange={handleChange} />
      <EventPlaceTypeInput
        value={data.eventType}
        onChange={handleSelectChange}
      />
    </>
  );
};

export default EventForm;
