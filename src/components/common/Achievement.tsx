import styled from 'styled-components';
import {AchievementProps} from '@/assets/types/achievement';

function Achievement({subtitle, type, total, color, data}: AchievementProps) {
  const getRate = () => {
    return Number((data.percentage / 100).toFixed(1));
  };

  return (
    <AchievementBox>
      <ContentBox>
        <TitleWrap>
          {data.name}
          {subtitle && <p>{subtitle}</p>}
        </TitleWrap>
        <Achieved>
          {type ? `${data.count}/${total}` : `${data.count}회`}
        </Achieved>
      </ContentBox>
      <Graph>
        <AchievedGraph $color={color} $rate={() => getRate()} />
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
