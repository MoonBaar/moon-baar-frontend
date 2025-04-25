import styled from 'styled-components';
import {useEffect, useRef} from 'react';
import {getEventList} from '@/apis/api/event';
import EventItem from './EventItem';
import {useInView} from 'react-intersection-observer';
import {QueryFunctionContext, useInfiniteQuery} from '@tanstack/react-query';
import EventItemSkeleton from './EventItemSkeleton';
import {EventListProps} from '@/assets/types/event';

interface EventParamsProps {
  query: string | null;
  categoryFilter: {
    id: number;
    value: string;
  } | null;
  isFreeFilter: {
    id: number;
    value: string;
  } | null;
  districtFilter: {
    id: number;
    value: string;
  } | null;
  startDate: string | null;
}

function EventList({
  query,
  categoryFilter,
  isFreeFilter,
  districtFilter,
  startDate,
}: EventParamsProps) {
  const categoryId = categoryFilter?.id || null;
  const isFree = isFreeFilter ? (isFreeFilter?.id === 1 ? true : false) : null;
  const districtId = districtFilter?.id || null;
  const {ref, inView} = useInView();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [query, categoryFilter, isFreeFilter, districtFilter, startDate]);

  const {data, isFetchingNextPage, fetchNextPage, hasNextPage, status} =
    useInfiniteQuery<EventListProps>({
      queryKey: [
        query,
        'events',
        categoryFilter,
        isFreeFilter,
        districtFilter,
        startDate,
      ],
      queryFn: async ({pageParam}: QueryFunctionContext) => {
        return await getEventList({
          query,
          page: pageParam as number,
          categoryId,
          isFree,
          districtId,
          startDate,
        });
      },
      getNextPageParam: lastPage =>
        lastPage.currentPage < lastPage.totalPages
          ? lastPage.currentPage + 1
          : undefined,
      staleTime: 1000 * 60 * 5,
      initialPageParam: 1,
    });

  // 무한 스크롤
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <EventListContainer ref={listRef}>
      {status === 'pending' && (
        <>
          {Array.from({length: 5}).map((_, i) => (
            <EventItemSkeleton key={i} />
          ))}
        </>
      )}
      {status === 'error' && (
        <ErrorMessage>
          <div>불러오기에 실패했습니다</div>
          <div>다시 시도해 주세요</div>
        </ErrorMessage>
      )}
      {data?.pages.flatMap(page => page.events).length === 0 ? (
        <ErrorMessage>일치하는 행사가 없습니다</ErrorMessage>
      ) : (
        <>
          {data?.pages.map(page =>
            page.events.map(event => <EventItem key={event.id} data={event} />),
          )}
          <div ref={ref} style={{height: '1px'}} />
        </>
      )}
      {isFetchingNextPage && (
        <>
          {Array.from({length: 5}).map((_, i) => (
            <EventItemSkeleton key={`skeleton-${i}`} />
          ))}
        </>
      )}
    </EventListContainer>
  );
}

const EventListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 1.6rem 0.1rem 1.6rem;
  gap: 1.2rem;
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 8rem;
  gap: 0.6rem;
  font-size: ${props => props.theme.sizes.m};
`;

export default EventList;
