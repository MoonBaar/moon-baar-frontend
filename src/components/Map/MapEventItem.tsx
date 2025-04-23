import styled from 'styled-components';
import {ReactComponent as Location} from '@/assets/img/location.svg';
import date from '@/assets/img/date.svg';
import {footprintProps} from '@/assets/types/map';
import {useNavigate} from 'react-router-dom';

function MapEventItem({event}: {event: footprintProps}) {
  const navigate = useNavigate();

  const dateFormat = (date: string) => {
    const dateFormatted = date.split('T')[0];

    return dateFormatted;
  };

  return (
    <EventItemContainer onClick={() => navigate(`/event/${event.id}`)}>
      <MainImage src={event.mainImg} alt='mainImage' />
      <EventContent>
        <EventTitle>{event.title}</EventTitle>
        <EventPlace>
          <Location width='14px' height='14px' />
          <div>{event.place}</div>
        </EventPlace>
        <EventDate>
          <img src={date} alt='date' />
          <div>방문한 날짜: {dateFormat(event.visitedAt)}</div>
        </EventDate>
      </EventContent>
    </EventItemContainer>
  );
}

const EventItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: fit-content;
  gap: 0.8rem;
  cursor: pointer;
`;

const MainImage = styled.img`
  width: 6.4rem;
  height: 8rem;
  background-color: ${props => props.theme.colors.neutral5};
  border-radius: 0.4rem;
  flex-shrink: 0;
`;

const EventContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
`;

const EventTitle = styled.div`
  font-size: ${props => props.theme.sizes.s};
  font-weight: 500;
  line-height: 2rem;
`;

const EventPlace = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: ${props => props.theme.sizes.xs};
  line-height: 1.6rem;
  color: ${props => props.theme.colors.neutral2};
`;

const EventDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: ${props => props.theme.sizes.xs};
  line-height: 1.6rem;
  color: ${props => props.theme.colors.neutral2};
`;

export default MapEventItem;
