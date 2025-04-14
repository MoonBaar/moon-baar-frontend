import styled from 'styled-components';
import {useEffect, useRef, useState} from 'react';
import {getEventList} from '@/apis/api/event';
import EventItem from './EventItem';
import {useInView} from 'react-intersection-observer';
import {QueryFunctionContext, useInfiniteQuery} from '@tanstack/react-query';
import EventItemSkeleton from './EventItemSkeleton';
import {useEventFilterStore, useScrollStore} from '@/store/eventList';
import {EventListProps} from '@/assets/types/event';
import {useScrollRestore} from '@/hooks/useScrollRestore';

function EventList() {
  const [category, setCategory] = useState<number | null>(null);
  const [isFree, setIsFree] = useState<boolean | null>(null);
  const {query, district} = useEventFilterStore();
  const {ref, inView} = useInView();
  const listRef = useRef<HTMLDivElement>(null);
  const {scrollY, setScrollY} = useScrollStore();

  const {data, isFetchingNextPage, fetchNextPage, hasNextPage, status} =
    useInfiniteQuery<EventListProps>({
      queryKey: [query, 'events', category, isFree],
      queryFn: async ({pageParam}: QueryFunctionContext) => {
        return await getEventList({
          query,
          page: pageParam as number,
          category,
          isFree,
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

  useScrollRestore({scrollY, setScrollY, data, status});

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <EventListContainer ref={listRef}>
      {status === 'pending' && (
        <>
          {Array.from({length: 10}).map((_, i) => (
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
      {data?.pages.map(page =>
        page.events.map(event => <EventItem key={event.id} {...event} />),
      )}
      <div ref={ref} style={{height: '1px'}} />
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
  margin: auto;
  padding: 0.8rem 1.6rem 0.1rem 1.6rem;
  gap: 1.2rem;
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  font-size: ${props => props.theme.sizes.m};
`;

export default EventList;
