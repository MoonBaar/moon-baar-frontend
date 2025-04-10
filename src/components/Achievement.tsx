import styled from 'styled-components';
import {AchievedProps} from '@/pages/Badge';

interface AchievementProps {
  data: AchievedProps;
}

function Achievement({data}: AchievementProps) {
  const getRate = () => {
    return Number((data.current / data.total).toFixed(1));
  };

  return (
    <AchievementBox>
      <ContentBox>
        <TitleWrap>
          {data.title}
          {data.subtitle && <p>{data.subtitle}</p>}
        </TitleWrap>
        <Achieved>
          {data.type ? `${data.current}/${data.total}` : `${data.current}회`}
        </Achieved>
      </ContentBox>
      <Graph>
        <AchievedGraph $color={data.color} $rate={() => getRate()} />
      </Graph>
    </AchievementBox>
  );
}

const AchievementBox = styled.div`
  border-radius: 8px;
  background-color: ${props => props.theme.colors.neutral6};
  width: 37.5rem;
  min-height: 6.5rem;
  padding: 1.2rem;

  @media screen and (max-width: 44rem) {
    width: 100%;
  }
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

const TitleWrap = styled.div`
  font-size: ${props => props.theme.sizes.m};

  & p {
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.sizes.s};
    margin-top: 0.5rem;
  }
`;

const Achieved = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.sizes.m};
`;

const Graph = styled.div`
  width: 35rem;
  height: 0.8rem;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.neutral4};

  @media screen and (max-width: 44rem) {
    width: 100%;
  }
`;

const AchievedGraph = styled.div<{$color: string; $rate: () => number}>`
  background-color: ${props => props.$color};
  width: calc(100% * ${props => props.$rate});
  height: 0.8rem;
  border-radius: 8px;
`;

export default Achievement;
