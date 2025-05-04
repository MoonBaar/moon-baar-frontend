import {useEffect, useState} from 'react';
import styled from 'styled-components';
import Achievement from '@/components/common/Achievement';
import BadgeItem from '@/components/Badge/BadgeItem';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/Layout';
import {basicHeight} from '@/assets/data/constant';
import {useAuthStore} from '@/store/user';
import {LoginMessage} from '@/styles/common';
import LoginButton from '@/components/common/LoginButton';
import {NextBadgeProps} from '@/assets/types/badge';
import {getNextGoal, useGetBadgeList} from '@/apis/api/users';
import Popup from '@/components/common/Popup';
import BadgeItemSkeleton from '@/components/Badge/BadgeItemSkeleton';

function Badge() {
  const [goal, setGoal] = useState<NextBadgeProps>();
  const {user, isGuest} = useAuthStore();
  const {data, status} = useGetBadgeList();

  useEffect(() => {
    if (user) {
      getGoal();
    }
  }, [user]);

  const getGoal = async () => {
    try {
      const data = await getNextGoal();
      setGoal(data);
    } catch (error) {
      console.log('get next goal error', error);
    }
  };

  return (
    <>
      <Popup />
      <Header />
      <Layout headerHeight={basicHeight}>
        {!user || isGuest ? (
          <LoginMessage>
            <LoginButton comment='로그인하고 배지를 모아보세요!' />
          </LoginMessage>
        ) : (
          <>
            <Box style={{paddingBottom: 0}}>
              <Label>다음 목표</Label>
              <Achievement
                subtitle={goal?.description || ''}
                total={goal?.target || 0}
                type='goal'
                color='#5D9D8A'
                data={{
                  name: goal?.name || '',
                  count: goal?.progress || 0,
                  percentage: goal ? (goal.progress / goal.target) * 100 : 0,
                }}
              />
            </Box>
            <Box>
              <Label>나의 배지</Label>
              <BadgeListWrap>
                {status === 'pending' && (
                  <>
                    {Array.from({length: 9}).map((_, i) => (
                      <BadgeItemSkeleton key={i} />
                    ))}
                  </>
                )}
                {data &&
                  data.map(item => <BadgeItem key={item.id} data={item} />)}
              </BadgeListWrap>
            </Box>
          </>
        )}
      </Layout>
      <Footer />
    </>
  );
}

const Label = styled.h2`
  font-size: ${props => props.theme.sizes.l};
  font-weight: bold;
  margin-bottom: 1.6rem;
`;

const Box = styled.div`
  padding: 3rem;
  width: 100%;
`;

const BadgeListWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 1.5rem;
`;

export default Badge;
