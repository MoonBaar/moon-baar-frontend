import styled from 'styled-components';
import {ReactComponent as Location} from '@/assets/img/location.svg';
import date from '@/assets/img/date.svg';
import {useNavigate} from 'react-router-dom';
import {EventProps} from '@/assets/types/event';
import {useEventFilterStore, useScrollStore} from '@/store/eventList';

interface ItemProps {
  data: EventProps;
}

function EventItem({data}: ItemProps) {
  const navigate = useNavigate();
  const {categoryFilter, isFreeFilter, districtFilter} = useEventFilterStore();
  const {setScrollY} = useScrollStore();

  const dateFormat = () => {
    const startDateFormatted = data.startDate.split('T')[0];
    const endDateFormatted = data.endDate.split('T')[0];

    if (startDateFormatted === endDateFormatted) {
      return startDateFormatted;
    }
    return `${startDateFormatted}~${endDateFormatted}`;
  };

  const handleOnClick = (e: React.MouseEvent) => {
    setScrollY(window.scrollY);
    navigate(`/event/${data.id}`);
    e.stopPropagation();
  };

  return (
    <EventItemContainer onClick={handleOnClick}>
      <MainImage
        src={data.mainImg}
        alt='mainImage'
        $isSimple={data.category === undefined}
      />
      <EventContent>
        {data.category && (
          <FilterList>
            <FilterItem $isFilter={categoryFilter !== null}>
              {data.category}
            </FilterItem>
            <FilterItem $isFilter={isFreeFilter !== null}>
              {data.isFree === true ? '무료' : '유료'}
            </FilterItem>
            <FilterItem $isFilter={districtFilter !== null}>
              {data.district}
            </FilterItem>
          </FilterList>
        )}
        <EventTitle>{data.title}</EventTitle>
        <EventPlace>
          <Location width='14px' height='14px' />
          <div>{data.place}</div>
        </EventPlace>
        <EventDate>
          <img src={date} alt='date' />
          <div>{dateFormat()}</div>
        </EventDate>
        {data.isVisited !== undefined && data.isVisited ? (
          <CheckInButton $checkIn={false}>방문완료</CheckInButton>
        ) : (
          <CheckInButton $checkIn={true}>방문하기</CheckInButton>
        )}
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
  padding: 1.2rem 0;
  border-bottom: 0.8px solid ${props => props.theme.colors.neutral4};
  cursor: pointer;
`;

const MainImage = styled.img<{$isSimple: boolean}>`
  width: ${props => (props.$isSimple ? '8rem' : '10rem')};
  height: ${props => (props.$isSimple ? '10rem' : '13rem')};
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
  gap: 0.6rem;
`;

const FilterItem = styled.div<{$isFilter: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 0.8rem;
  font-size: ${props => props.theme.sizes.xs};
  background-color: ${props =>
    props.$isFilter === true
      ? props.theme.colors.secondary
      : props.theme.colors.neutral5};
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
  gap: 0.2rem;
  font-size: ${props => props.theme.sizes.s};
  line-height: 2rem;
  color: ${props => props.theme.colors.neutral2};
`;

const EventDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: ${props => props.theme.sizes.s};
  line-height: 2rem;
  color: ${props => props.theme.colors.neutral2};
`;

const CheckInButton = styled.button<{$checkIn: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 1.2rem;
  font-size: ${props => props.theme.sizes.xs};
  background-color: ${props =>
    props.$checkIn ? props.theme.colors.primary : props.theme.colors.neutral4};
  color: ${props => (props.$checkIn ? 'white' : props.theme.colors.primary)};
  width: fit-content;
  border-radius: 1.6rem;
  margin: 0.4rem 0;
`;

export default EventItem;
