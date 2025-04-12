import styled from 'styled-components';
import {EventDetailProps} from '@/assets/types/event';
import {ReactComponent as Location} from '@/assets/img/location.svg';
import {ReactComponent as Calendar} from '@/assets/img/calendar.svg';
import {ReactComponent as Ticket} from '@/assets/img/ticket.svg';
import {ReactComponent as Users} from '@/assets/img/users.svg';
import {ReactComponent as Building} from '@/assets/img/building.svg';
import {ReactComponent as Exlink} from '@/assets/img/link.svg';

interface InfoProps {
  data: EventDetailProps;
}

function Info({data}: InfoProps) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <InfoArea>
        <InfoWrap>
          <Location width='18px' height='18px' />
          <h3>{data.place}</h3>
        </InfoWrap>
        <InfoWrap>
          <Calendar />
          <h3>
            {data.startDate.split('T')[0]} ~ {data.endDate.split('T')[0]}
          </h3>
        </InfoWrap>
        <InfoWrap>
          <Ticket />
          <div>
            <h3>{data.isFree ? '무료' : '유료'}</h3>
            {!data.isFree && <p>{data.useFee}</p>}
          </div>
        </InfoWrap>
        <InfoWrap>
          <Users />
          <h3>{data.useTarget}</h3>
        </InfoWrap>
        <InfoWrap>
          <Building />
          <h3>{data.orgName}</h3>
        </InfoWrap>
        <InfoWrap>
          <Exlink />
          <a href={data.orgLink}>{data.orgLink}</a>
        </InfoWrap>
      </InfoArea>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 1.6rem;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.sizes.xl};
  font-weight: bold;
  margin-bottom: 1.6rem;
  word-break: keep-all;
  line-height: 2.8rem;
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  row-gap: 1rem;
`;

const InfoWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  width: 100%;
  font-size: ${props => props.theme.sizes.m};

  & p {
    font-size: ${props => props.theme.sizes.s};
    color: ${props => props.theme.colors.primary};
    margin-top: 0.5rem;
  }

  & a {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 90%;
  }
`;

export default Info;
