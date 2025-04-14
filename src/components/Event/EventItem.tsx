import styled from 'styled-components';
import {ReactComponent as Location} from '@/assets/img/location.svg';
import date from '@/assets/img/date.svg';
import {useNavigate} from 'react-router-dom';
import {EventProps} from '@/assets/types/event';

function EventItem({
  id,
  title,
  category,
  district,
  place,
  startDate,
  endDate,
  isFree,
  mainImg,
  latitude,
  longitude,
  isVisited,
}: EventProps) {
  const navigate = useNavigate();

  const dateFormat = () => {
    const startDateFormatted = startDate.split('T')[0];
    const endDateFormatted = endDate.split('T')[0];

    if (startDateFormatted === endDateFormatted) {
      return startDateFormatted;
    }
    return `${startDateFormatted}~${endDateFormatted}`;
  };

  return (
    <EventItemContainer onClick={() => navigate(`/event/${id}`)}>
      <MainImage src={mainImg} alt='mainImage' />
      <EventContent>
        <FilterList>
          <FilterItem>{category}</FilterItem>
          <FilterItem>{isFree === true ? '무료' : '유료'}</FilterItem>
        </FilterList>
        <EventTitle>{title}</EventTitle>
        <EventPlace>
          <Location width='14px' height='14px' />
          <div>{place}</div>
        </EventPlace>
        <EventDate>
          <img src={date} alt='date' />
          <div>{dateFormat()}</div>
        </EventDate>
        <CheckInButton>방문하기</CheckInButton>
      </EventContent>
    </EventItemContainer>
  );
}

const EventItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  height: fit-content;
  padding-bottom: 1.2rem;
  border-bottom: 0.8px solid ${props => props.theme.colors.neutral4};
  cursor: pointer;
`;

const MainImage = styled.img`
  width: 10rem;
  height: 13rem;
  background-color: ${props => props.theme.colors.neutral5};
  border-radius: 0.4rem;
  flex-shrink: 0;
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
  color: ${props => props.theme.colors.primary};
  border-radius: 1.6rem;
`;

const EventTitle = styled.div`
  font-size: ${props => props.theme.sizes.m};
  font-weight: 500;
  line-height: 2.4rem;
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
  gap: 0.4rem;
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

export default EventItem;
