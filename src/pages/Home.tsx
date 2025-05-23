import styled from 'styled-components';
import Layout from '@/components/common/Layout';
import Footer from '@/components/common/Footer';
import {searchHeight} from '@/assets/data/constant';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import Header from '@/components/common/Header/Header';
import {useCallback, useEffect, useRef, useState} from 'react';
import {getVisitList, useGetFootPrints} from './../apis/api/event';
import footprint from '@/assets/img/mapMarker.svg';
import debounce from '@/utils/debounce';
import {boundsProps, footprintProps} from '@/assets/types/map';
import MapEventItem from '@/components/Home/MapEventItem';
import {useAuthStore} from '@/store/user';
import {LoginMessage, Title} from '@/styles/common';
import LoginButton from '@/components/common/LoginButton';
import {useInView} from 'react-intersection-observer';
import {QueryFunctionContext, useInfiniteQuery} from '@tanstack/react-query';
import {EventListProps} from '@/assets/types/event';
import MonthlyEventList from '@/components/Home/MontlyEventList';
import {useEventsInfoStore, useInfoBoxStore, useMapStore} from '@/store/map';

function Home() {
  const mapRef = useRef<kakao.maps.Map>(null);
  const [boundsInfo, setBoundsInfo] = useState<boundsProps>({
    maxLat: null,
    minLat: null,
    maxLng: null,
    minLng: null,
  });
  const {data: footprints} = useGetFootPrints(boundsInfo);
  const {isOpen, setIsOpen} = useInfoBoxStore();
  const {eventsInfo, setEventsInfo} = useEventsInfoStore();
  const {user, isGuest} = useAuthStore();
  const [ref, inView] = useInView();
  const [currentFootprints, setCurrentFootprints] = useState<footprintProps[]>(
    [],
  );
  const {latitude, longitude, level, setLatitude, setLongitude, setLevel} =
    useMapStore();

  useEffect(() => {
    if (footprints && currentFootprints !== footprints.events) {
      setCurrentFootprints(footprints.events);
    }
  }, [footprints, currentFootprints]);

  const getList = async ({pageParam}: QueryFunctionContext) => {
    const data = await getVisitList(pageParam as number, 'thisMonth');
    return data;
  };

  const {data, hasNextPage, isFetchingNextPage, fetchNextPage, status} =
    useInfiniteQuery<EventListProps>({
      queryKey: ['visits'],
      queryFn: getList,
      getNextPageParam: lastPage =>
        lastPage.currentPage < lastPage.totalPages
          ? lastPage.currentPage + 1
          : undefined,
      initialPageParam: 1,
      retry: 0,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  const handleIdle = useCallback(
    debounce(() => {
      const map = mapRef.current;
      if (!map) return;

      const bounds = map.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      const newBounds = {
        maxLat: ne.getLat(),
        minLat: sw.getLat(),
        maxLng: ne.getLng(),
        minLng: sw.getLng(),
      };

      if (
        boundsInfo.maxLat === newBounds.maxLat &&
        boundsInfo.minLat === newBounds.minLat &&
        boundsInfo.maxLng === newBounds.maxLng &&
        boundsInfo.minLng === newBounds.minLng
      ) {
        return;
      } else {
        setBoundsInfo(newBounds);
        setLatitude(map.getCenter().getLat());
        setLongitude(map.getCenter().getLng());
        setLevel(map.getLevel());
      }
    }, 300),
    [],
  );

  const handleOnClick = (event: footprintProps) => {
    if (!isOpen && mapRef.current) {
      const samePositionEvents =
        footprints?.events.filter(
          e => e.latitude === event.latitude && e.longitude === event.longitude,
        ) || [];
      setEventsInfo(samePositionEvents);

      mapRef.current.setCenter(
        new kakao.maps.LatLng(event.latitude, event.longitude),
      );
      mapRef.current.setLevel(4);
    }
    setLatitude(event.latitude);
    setLongitude(event.longitude);
    setLevel(4);

    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header />
      <Layout headerHeight={searchHeight}>
        <MapContainer>
          <Title>나의 문화 발자국 지도</Title>
          {!user || isGuest ? (
            <MapLoginMessage>
              <div>로그인하고 발자국을 남겨보세요!</div>
            </MapLoginMessage>
          ) : (
            <MapWrap>
              <Map
                center={{lat: latitude, lng: longitude}}
                style={{width: '100%', height: '400px', borderRadius: '1rem'}}
                level={level}
                onCreate={map => {
                  mapRef.current = map;
                  kakao.maps.event.addListener(map, 'idle', handleIdle);
                  handleIdle();
                }}
                onClick={() => setIsOpen(false)}
              >
                {currentFootprints.map(event => (
                  <MapMarker
                    key={event.id}
                    position={{lat: event.latitude, lng: event.longitude}}
                    image={{
                      src: footprint,
                      size: {
                        width: 36,
                        height: 46,
                      },
                    }}
                    title={event.title}
                    onClick={() => handleOnClick(event)}
                  />
                ))}
              </Map>
              <FloatBox>
                <div>
                  이번 달 발자국 수: <span>{data?.pages[0].totalCount}</span>
                </div>
              </FloatBox>
              <MapInfoBox $isOpen={isOpen}>
                <MapInfoList>
                  {eventsInfo.map(event => (
                    <MapEventItem key={event.id} event={event} />
                  ))}
                </MapInfoList>
              </MapInfoBox>
            </MapWrap>
          )}
        </MapContainer>
        <MonthlyContainer>
          <Title>이번 달 방문한 문화행사</Title>
          {!user || isGuest ? (
            <LoginMessage>
              <LoginButton comment='로그인이 필요해요' />
            </LoginMessage>
          ) : (
            <MonthlyEventList
              data={data}
              status={status}
              isFetchingNextPage={isFetchingNextPage}
              ref={ref}
            />
          )}
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
  border-radius: 1rem;
  border: 1px solid ${props => props.theme.colors.neutral5};
`;

const FloatBox = styled.div`
  width: 14rem;
  height: 3.4rem;
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

const MapInfoBox = styled.div<{$isOpen: boolean}>`
  width: 100%;
  background-color: white;
  position: absolute;
  bottom: 0;
  font-size: ${props => props.theme.sizes.s};
  border-radius: 1rem;
  z-index: 5;
  box-shadow:
    0 -6px 6px -5px rgba(0, 0, 0, 0.2),
    0 -8px 8px -5px rgba(0, 0, 0, 0.2);
  overflow: auto;

  max-height: ${({$isOpen}) => ($isOpen ? '15rem' : '0')};
  opacity: ${({$isOpen}) => ($isOpen ? '1' : '0')};
  transition: all 0.3s ease-in-out;
  pointer-events: ${({$isOpen}) => ($isOpen ? 'auto' : 'none')};
`;

const MapInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  width: 100%;
  height: 100%;
  padding: 1.4rem;
`;

const MapLoginMessage = styled.div`
  width: 100%;
  height: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  border: 1px solid ${props => props.theme.colors.neutral5};
  background-color: ${props => props.theme.colors.neutral5};
  opacity: 0.5;
  font-size: ${props => props.theme.sizes.s};
`;

const MonthlyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.2rem;
  width: 100%;
  padding: 0.4rem 1.6rem 1rem 1.6rem;
`;

export default Home;
