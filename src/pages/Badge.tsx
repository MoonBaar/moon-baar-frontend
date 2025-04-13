import {useState} from 'react';
import styled from 'styled-components';
import Achievement from '@/components/common/Achievement';
import BadgeItem from '@/components/Badge/BadgeItem';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/Layout';

const dummy = [
  {
    id: 0,
    isDone: true,
    name: '첫 발자국',
    img: 'https://i.pinimg.com/736x/e8/6b/ad/e86bad7bf215693ba10fb56ce073fe71.jpg',
  },
  {
    id: 1,
    isDone: true,
    name: '공연 마니아',
    img: 'https://i.pinimg.com/736x/e8/6b/ad/e86bad7bf215693ba10fb56ce073fe71.jpg',
  },
  {
    id: 2,
    isDone: false,
    name: '전시 탐험가',
    img: 'https://i.pinimg.com/736x/e8/6b/ad/e86bad7bf215693ba10fb56ce073fe71.jpg',
  },
  {
    id: 3,
    isDone: true,
    name: '서울 탐험가',
    img: 'https://i.pinimg.com/736x/e8/6b/ad/e86bad7bf215693ba10fb56ce073fe71.jpg',
  },
  {
    id: 4,
    isDone: false,
    name: '서울 완전 정복',
    img: 'https://i.pinimg.com/736x/e8/6b/ad/e86bad7bf215693ba10fb56ce073fe71.jpg',
  },
  {
    id: 5,
    isDone: false,
    name: '공연 탐험가',
    img: 'https://i.pinimg.com/736x/e8/6b/ad/e86bad7bf215693ba10fb56ce073fe71.jpg',
  },
  {
    id: 6,
    isDone: true,
    name: '뮤지컬 탐험가',
    img: 'https://i.pinimg.com/736x/e8/6b/ad/e86bad7bf215693ba10fb56ce073fe71.jpg',
  },
  {
    id: 7,
    isDone: false,
    name: '미술 탐험가',
    img: 'https://i.pinimg.com/736x/e8/6b/ad/e86bad7bf215693ba10fb56ce073fe71.jpg',
  },
  {
    id: 8,
    isDone: false,
    name: '클래식 탐험가',
    img: 'https://i.pinimg.com/736x/e8/6b/ad/e86bad7bf215693ba10fb56ce073fe71.jpg',
  },
];

export interface BadgeProps {
  id?: number;
  isDone: boolean;
  name: string;
  img: string;
}

export interface AchievedProps {
  title: string;
  subtitle?: string;
  total: number;
  current: number;
  type?: string;
  color: string;
}

function Badge() {
  const [list, setList] = useState<BadgeProps[]>(dummy);
  const [achieved, setAchieved] = useState<AchievedProps>({
    title: '서울 완전 정복',
    subtitle: '서울 25개 구 모두 방문하기',
    total: 25,
    current: 14,
    type: 'goal',
    color: '#5D9D8A',
  });

  return (
    <>
      <Header />
      <Layout headerHeight='6.5rem'>
        <Box style={{paddingBottom: 0}}>
          <Label>다음 목표</Label>
          <Achievement data={achieved} />
        </Box>
        <Box>
          <Label>나의 배지</Label>
          <BadgeListWrap>
            {list.map(item => (
              <BadgeItem
                key={item.id}
                isDone={item.isDone}
                name={item.name}
                img={item.img}
              />
            ))}
          </BadgeListWrap>
        </Box>
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
