import styled from 'styled-components';
import {basicHeight} from '@/assets/data/constant';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/Layout';
import {StatProps} from '@/assets/types/achievement';
import {useEffect, useState} from 'react';
import Achievement from '@/components/common/Achievement';
import Count from '@/components/Statistics/Count';
import LikeList from '@/components/Statistics/LikeList';
import {getStatistics} from '@/apis/api/users';
import {useAuthStore} from '@/store/user';
import {LoginMessage} from '@/styles/common';
import LoginButton from '@/components/common/LoginButton';
function Statistics() {
  const [stat, setStat] = useState<StatProps>();
  const {user, isGuest} = useAuthStore();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getStatistics();
        setStat(data);
      } catch (error) {
        console.log('get statistics error', error);
      }
    };
    if (user) {
      getData();
    }
  }, [user]);

  return (
    <>
      <Header />
      <Layout headerHeight={basicHeight}>
        {user && !isGuest ? (
          <>
            {stat && (
              <>
                <Box style={{paddingBottom: 0}}>
                  <Label>나의 발자국</Label>
                  <CountArea>
                    <Count
                      title='총 방문 행사'
                      count={stat.summary.totalVisits}
                      range='all'
                    />
                    <Count
                      title='이번 달 방문'
                      count={stat.summary.thisMonthVisits}
                      isMonth={true}
                      range='thisMonth'
                    />
                  </CountArea>
                  <AchievementArea>
                    <p>가장 많이 방문한 장르</p>
                    <Achievement color='#5676A5' data={stat.categories.top} />
                  </AchievementArea>
                  <AchievementArea>
                    <p>가장 많이 방문한 지역</p>
                    <Achievement color='#C1641E' data={stat.districts.top} />
                  </AchievementArea>
                  <GenresArea>
                    <p>방문한 장르</p>
                    <GenresBox>
                      {stat.categories.all.map((item, idx) => (
                        <GenreWrap key={idx}>{item}</GenreWrap>
                      ))}
                    </GenresBox>
                  </GenresArea>
                </Box>
                <Box>
                  <Label>관심 행사</Label>
                  <LikeList />
                </Box>
              </>
            )}
          </>
        ) : (
          <LoginMessage>
            <LoginButton comment='로그인하고 방문 통계를 확인해보세요!' />
          </LoginMessage>
        )}
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
