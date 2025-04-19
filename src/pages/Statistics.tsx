import styled from 'styled-components';
import {basicHeight} from '@/assets/data/constant';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/Layout';
import {AchievedProps} from '@/assets/types/achievement';
import {useState} from 'react';
import Achievement from '@/components/common/Achievement';
import Count from '@/components/Statistics/Count';
import LikeList from '@/components/Statistics/LikeList';

interface StatProps {
  totalVisits: number;
  thisMonthVisits: number;
  topGenre: AchievedProps;
  topDistrict: AchievedProps;
  visitedGenres: string[];
}

function Statistics() {
  const [stat, setStat] = useState<StatProps>({
    totalVisits: 23,
    thisMonthVisits: 8,
    topGenre: {name: '전시/미술', count: 8, percentage: 80},
    topDistrict: {name: '종로구', count: 5, percentage: 60},
    visitedGenres: ['전시/미술', '클래식', '연극', '콘서트', '교육/체험'],
  });

  return (
    <>
      <Header />
      <Layout headerHeight={basicHeight}>
        <Box style={{paddingBottom: 0}}>
          <Label>나의 발자국</Label>
          <CountArea>
            <Count title='총 방문 행사' count={23} />
            <Count title='이번 달 방문' count={8} isMonth={true} />
          </CountArea>
          <AchievementArea>
            <p>가장 많이 방문한 장르</p>
            <Achievement color='#5676A5' data={stat.topGenre} />
          </AchievementArea>
          <AchievementArea>
            <p>가장 많이 방문한 지역</p>
            <Achievement color='#C1641E' data={stat.topDistrict} />
          </AchievementArea>
          <GenresArea>
            <p>방문한 장르</p>
            <GenresBox>
              {stat.visitedGenres.map((item, idx) => (
                <GenreWrap key={idx}>{item}</GenreWrap>
              ))}
            </GenresBox>
          </GenresArea>
        </Box>
        <Box>
          <Label>관심 행사</Label>
          <LikeList />
        </Box>
      </Layout>
      <Footer />
    </>
  );
}

const Box = styled.div`
  width: 100%;
  padding: 3.2rem;
`;

const Label = styled.h2`
  font-size: ${props => props.theme.sizes.l};
  font-weight: bold;
  margin-bottom: 1.6rem;
`;

const CountArea = styled.div`
  width: 100%;
  display: flex;
  column-gap: 1.6rem;
  margin-bottom: 2.5rem;
`;

const AchievementArea = styled.div`
  width: 100%;
  margin-bottom: 2rem;

  & p {
    font-size: ${props => props.theme.sizes.m};
    margin-bottom: 1.5rem;
  }
`;

const GenresArea = styled.div`
  & p {
    font-size: ${props => props.theme.sizes.m};
    margin-bottom: 1.5rem;
  }
`;

const GenresBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const GenreWrap = styled.div`
  padding: 0.8rem 1.5rem;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.sizes.s};
  border-radius: 25px;
`;

export default Statistics;
