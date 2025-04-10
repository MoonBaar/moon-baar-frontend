import styled from 'styled-components';
import location from '@/assets/img/location.svg';
import date from '@/assets/img/date.svg';
import {useEffect, useState} from 'react';
import {getEventList} from '@/apis/api/event';

interface EventProps {
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

  const dateFormat = (index: number) => {
    const startDate = eventList?.events[index].startDate.split('T')[0];
    const endDate = eventList?.events[index].endDate.split('T')[0];

    if (startDate === endDate) {
      return startDate;
    }
    return `${startDate}~${endDate}`;
  };

  return (
    <EventListContainer>
      {eventList?.events?.map((event, index) => (
        <EventItem key={index}>
          <MainImage>
            <img src={event.imageUrl} alt='mainImage' />
          </MainImage>
          <EventContent>
            <FilterList>
              <FilterItem>{event.category}</FilterItem>
              <FilterItem>{event.isFree === true ? '무료' : '유료'}</FilterItem>
            </FilterList>
            <EventTitle>{event.title}</EventTitle>
            <EventPlace>
              <img src={location} alt='location' />
              <div>{event.place}</div>
            </EventPlace>
            <EventDate>
              <img src={date} alt='date' />
              <div>{dateFormat(index)}</div>
            </EventDate>
            <CheckInButton>방문하기</CheckInButton>
          </EventContent>
        </EventItem>
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

const EventItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  height: fit-content;
  padding-bottom: 1.2rem;
  border-bottom: 0.8px solid ${props => props.theme.colors.neutral4};
  cursor: pointer;
`;

const MainImage = styled.div`
  width: 10rem;
  height: 13rem;
  background-color: ${props => props.theme.colors.neutral4};
  border-radius: 0.4rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.4rem;
  }
`;

const EventContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
`;

const FilterList = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const FilterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 0.8rem;
  font-size: ${props => props.theme.sizes.xs};
  background-color: ${props => props.theme.colors.neutral5};
  border-radius: 1.6rem;
`;

const EventTitle = styled.div`
  font-size: ${props => props.theme.sizes.m};
  font-weight: 500;
  line-height: 2.4rem;
  color: ${props => props.theme.colors.neutral1};
`;

const EventPlace = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: ${props => props.theme.sizes.s};
  line-height: 2rem;
  color: ${props => props.theme.colors.neutral2};
`;

const EventDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: ${props => props.theme.sizes.xs};
  line-height: 2rem;
  color: ${props => props.theme.colors.neutral2};
`;

const CheckInButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 1.2rem;
  font-size: ${props => props.theme.sizes.xs};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  width: fit-content;
  border-radius: 1.6rem;
  margin: 0.4rem 0;
`;

export default EventList;
