import styled from 'styled-components';
import location from '@/assets/img/location.svg';
import date from '@/assets/img/date.svg';

function SimpleEventItem() {
  return (
    <EventItemContainer>
      <MainImage src={'/'} alt='mainImage' />
      <EventContent>
        <EventTitle>
          [노원문화원] 2025 노원문화원 국악 예술단 정기공연
        </EventTitle>
        <EventPlace>
          <img src={location} alt='location' />
          <div>노원문화예술회관 대공연장</div>
        </EventPlace>
        <EventDate>
          <img src={date} alt='date' />
          <div>2025-03-28~2025-03-28</div>
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
  padding-bottom: 1rem;
  border-bottom: 0.8px solid ${props => props.theme.colors.neutral4};
  cursor: pointer;
`;

const MainImage = styled.img`
  width: 8rem;
  height: 10rem;
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

export default SimpleEventItem;
