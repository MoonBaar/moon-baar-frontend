import {useEffect} from 'react';
import styled from 'styled-components';
import {QueryFunctionContext, useInfiniteQuery} from '@tanstack/react-query';
import {useInView} from 'react-intersection-observer';
import {getLikeList} from '@/apis/api/like';
import {EventListProps} from '@/assets/types/event';
import {useScrollStore} from '@/store/eventList';
import EventItem from '../Event/EventItem';
import EventItemSkeleton from '../Event/EventItemSkeleton';
import NoList from '../common/NoList';

function LikeList() {
  const [ref, inView] = useInView();
  const {scrollY} = useScrollStore();

  const getList = async ({pageParam}: QueryFunctionContext) => {
    const data = await getLikeList(pageParam as number);
    return data;
  };

  const {data, isFetchingNextPage, fetchNextPage, status} =
    useInfiniteQuery<EventListProps>({
      queryKey: ['likes'],
      queryFn: getList,
      getNextPageParam: lastPage =>
        lastPage.currentPage < lastPage.totalPages
          ? lastPage.currentPage + 1
          : undefined,
      initialPageParam: 1,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    if (scrollY !== 0) {
      window.scrollTo(0, scrollY);
    }
  }, [scrollY]);

  return (
    <Container>
      {data?.pages[0].totalCount === 0 ? (
        <NoList type='관심' />
      ) : (
        <>
          {status === 'pending' && (
            <>
              {Array.from({length: 10}).map((_, i) => (
                <EventItemSkeleton key={i} />
              ))}
            </>
          )}
          {data?.pages.map(page =>
            page.events.map(event => <EventItem key={event.id} data={event} />),
          )}
          {isFetchingNextPage ? (
            <>
              {Array.from({length: 5}).map((_, i) => (
                <EventItemSkeleton key={`skeleton-${i}`} />
              ))}
            </>
          ) : (
            <div ref={ref} />
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 1.6rem;
`;

export default LikeList;
