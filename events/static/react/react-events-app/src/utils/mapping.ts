import { PlaceTypes } from '../constants';
import { EventDBProps, EventProps, EventTableProps } from '../interfaces/types';

export const mapEventTypeToPlaceType = (eventTypeName: string): PlaceTypes => {
  const placeType = Object.values(PlaceTypes).find(
    (type) => type === eventTypeName
  );
  return placeType || PlaceTypes.TEAM_BUILDING;
};

export const mapEventData = (apiData: EventDBProps[]): EventProps[] => {
  return apiData.map((event) => ({
    eventTitle: event.title,
    placeType: mapEventTypeToPlaceType(event.event_type),
    address: event.address,
    description: event.description,
    comments: [
      'Short comment!',
      'Great service. A lovely place to eat and hang out with friends. Great ambiance and food!',
      'Will visit again! A lovely place to eat and hang out with friends. Great ambiance and food!',
    ],
    placeRating: event.average_rating || 4.5,
    loudnessRating: 3,
  }));
};

export const mapEventTableData = (
  apiData: EventDBProps[]
): EventTableProps[] => {
  const data = apiData.map((event) => ({
    id: event.id,
    eventTitle: event.title,
    placeType: mapEventTypeToPlaceType(event.event_type),
    address: event.address,
    description: event.description,
  }));
  return data;
};
