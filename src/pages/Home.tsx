import styled from 'styled-components';
import Layout from '@/components/common/Layout';
import Footer from '@/components/common/Footer';
import {Title} from './Event';
import SimpleEventItem from '@/components/common/SimpleEventItem';
import {searchHeight} from '@/assets/data/constant';
import {Map, MapMarker, Polygon} from 'react-kakao-maps-sdk';
import mapPolygon from '../assets/data/mapPolygon.json';
import Header from '@/components/common/Header/Header';

function Home() {
  const seoulCoordinates = mapPolygon.features[0].geometry.coordinates[0].map(
    ([lng, lat]) => ({lat, lng}),
  );

  return (
    <>
      <Header />
      <Layout headerHeight={searchHeight}>
        <MapContainer>
          <Title>나의 문화 발자국 지도</Title>
          <MapWrap>
            <Map
              center={{lat: 37.566826, lng: 126.9786567}}
              style={{width: '100%', height: '400px', borderRadius: '1rem'}}
              level={9}
            >
              <Polygon
                path={seoulCoordinates}
                strokeWeight={2}
                strokeColor={'#5D9D8A'}
                strokeOpacity={1}
                strokeStyle={'solid'}
                fillColor={'#C1D7D4'}
                fillOpacity={0.2}
              />
              <MapMarker position={{lat: 37.566826, lng: 126.9786567}} />
            </Map>
            <FloatBox>
              <div>
                방문한 구: <span>0/25</span>
              </div>
            </FloatBox>
          </MapWrap>
        </MapContainer>
        <MonthlyContainer>
          <Title>이번달 방문한 문화행사</Title>
          <MonthlyEventList>
            <SimpleEventItem />
            <SimpleEventItem />
            <SimpleEventItem />
            <SimpleEventItem />
            <SimpleEventItem />
            <SimpleEventItem />
          </MonthlyEventList>
        </MonthlyContainer>
      </Layout>
      <Footer />
    </>
  );
}

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  padding: 1.6rem;
  gap: 1.2rem;
`;

const MapWrap = styled.div`
  width: 100%;
  height: 40rem;
  position: relative;
`;

const FloatBox = styled.div`
  width: 12.8rem;
  height: 3.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: ${props => props.theme.sizes.s};
  box-shadow:
    0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 5;

  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const MonthlyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.2rem;
  width: 100%;
  padding: 0.4rem 1.6rem 1rem 1.6rem;
`;

const MonthlyEventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default Home;
