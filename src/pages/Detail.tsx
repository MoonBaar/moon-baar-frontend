import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getEventDetail} from '@/apis/api/event';
import {EventDetailProps} from '@/assets/types/event';
import CheckInBtn from '@/components/Detail/CheckInBtn';
import Info from '@/components/Detail/Info';
import MainImage from '@/components/Detail/MainImage';
import VisitedStats from '@/components/Detail/VisitedStats';
import DetailHeader from '@/components/common/Header/DetailHeader';
import Layout from '@/components/common/Layout';
import {basicHeight, emptyHeight} from '@/assets/data/constant';

function Detail() {
  const id = useParams().id || '0';
  const [info, setInfo] = useState<EventDetailProps>();

  useEffect(() => {
    const getDetail = async () => {
      if (id) {
        const data = await getEventDetail(parseInt(id));
        if (data) {
          setInfo(data);
        }
      }
    };

    getDetail();
  }, [id]);

  return (
    <>
      <DetailHeader name='행사 상세' />
      {info && (
        <Layout headerHeight={basicHeight} footerHeight={emptyHeight}>
          <MainImage
            id={parseInt(id)}
            imageUrl={info.mainImg}
            isLiked={false}
            category={info.category}
          />
          <Info data={info} />
          <CheckInBtn isVisited={false} />
          <VisitedStats visitCount={145} likeCount={30} />
        </Layout>
      )}
    </>
  );
}

export default Detail;
