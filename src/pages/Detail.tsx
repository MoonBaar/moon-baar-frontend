import {useParams} from 'react-router-dom';
import {useGetEventDetail} from '@/apis/api/event';
import CheckInBtn from '@/components/Detail/CheckInBtn';
import Info from '@/components/Detail/Info';
import MainImage from '@/components/Detail/MainImage';
import VisitedStats from '@/components/Detail/VisitedStats';
import DetailHeader from '@/components/common/Header/DetailHeader';
import Layout from '@/components/common/Layout';
import {basicHeight, emptyHeight} from '@/assets/data/constant';
import Modal from '@/components/common/Modal';
import FullImage from '@/components/Detail/FullImage';
import InfoSkeleton from '@/components/Detail/InfoSkeleton';
import {ErrorMessage} from '@/styles/common';
import {useAuthStore} from '@/store/user';

function Detail() {
  const id = useParams().id || '0';
  const {data, status} = useGetEventDetail(parseInt(id));
  const {user} = useAuthStore();

  return (
    <>
      <Modal />
      <DetailHeader name='행사 상세' />
      {status === 'pending' && (
        <Layout headerHeight={basicHeight} footerHeight={emptyHeight}>
          <InfoSkeleton />
        </Layout>
      )}
      {status === 'error' && (
        <ErrorMessage>행사 상세 정보를 불러오지 못했습니다</ErrorMessage>
      )}
      {data && (
        <>
          <Layout headerHeight={basicHeight} footerHeight={emptyHeight}>
            <MainImage
              id={parseInt(id)}
              title={data.title}
              imageUrl={data.mainImg}
              isVisited={true}
              isLiked={false}
              category={data.category}
              user={user}
            />
            <Info data={data} />
            <CheckInBtn id={parseInt(id)} user={user} />
            <VisitedStats visitCount={145} likeCount={30} />
            <FullImage imageUrl={data.mainImg} />
          </Layout>
        </>
      )}
    </>
  );
}

export default Detail;
