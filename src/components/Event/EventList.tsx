import styled from 'styled-components';
import {useEffect, useState} from 'react';
import {getEventList} from '@/apis/api/event';
import EventItem from './EventItem';

export interface EventProps {
  id: number;
  title: string;
  category: string;
  district: string;
  place: string;
  startDate: string;
  endDate: string;
  isFree: boolean;
  imageUrl: string;
  latitude: number;
  longitude: number;
  isLiked: boolean;
}

interface EventListProps {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  events: EventProps[];
}

function EventList() {
  const [eventList, setEventList] = useState<EventListProps | null>(null);

  useEffect(() => {
    const fetchEventList = async () => {
      const events = await getEventList();
      setEventList(events);
      console.log(events);
    };
    fetchEventList();
  }, []);

  return (
    <EventListContainer>
      {eventList?.events?.map((event, index) => (
        <EventItem
          key={index}
          id={event.id}
          title={event.title}
          category={event.category}
          district={event.district}
          place={event.place}
          startDate={event.startDate}
          endDate={event.endDate}
          isFree={event.isFree}
          imageUrl={event.imageUrl}
          latitude={event.latitude}
          longitude={event.longitude}
          isLiked={event.isLiked}
        />
      ))}
    </EventListContainer>
  );
}

const EventListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.8rem 1.6rem 0.1rem 1.6rem;
  gap: 1.6rem;
`;

export default EventList;
