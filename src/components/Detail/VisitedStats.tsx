import styled from 'styled-components';
import {ReactComponent as People} from '@/assets/img/people.svg';
import {ReactComponent as Liked} from '@/assets/img/likeL.svg';

interface StatsProps {
  visitCount: number;
  likeCount: number;
}

function VisitedStats({visitCount, likeCount}: StatsProps) {
  return (
    <Container>
      <Title>방문 통계</Title>
      <StatsArea>
        <StatsWrap>
          <People />
          <h3>{visitCount}</h3>
          <p>방문</p>
        </StatsWrap>
        <StatsWrap>
          <Liked />
          <h3>{likeCount}</h3>
          <p>좋아요</p>
        </StatsWrap>
      </StatsArea>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 1.6rem;
`;

const Title = styled.div`
  font-size: ${props => props.theme.sizes.l};
  font-weight: bold;
`;

const StatsArea = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 10rem;
`;

const StatsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;

  & h3 {
    font-size: ${props => props.theme.sizes.l};
    font-weight: bold;
  }

  & p {
    font-size: ${props => props.theme.sizes.xs};
    color: ${props => props.theme.colors.neutral2};
  }
`;

export default VisitedStats;
