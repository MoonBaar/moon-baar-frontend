import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {QueryFunctionContext, useInfiniteQuery} from '@tanstack/react-query';
import {useInView} from 'react-intersection-observer';
import {getLikeList} from '@/apis/api/like';
import {EventListProps} from '@/assets/types/event';
import EventItem from '../Event/EventItem';
import EventItemSkeleton from '../Event/EventItemSkeleton';

function LikeList() {
  const [list, setList] = useState<EventListProps>();
  const [ref, inView] = useInView();

  const getList = async ({pageParam}: QueryFunctionContext) => {
    const data = await getLikeList(pageParam as number);
    return data;
  };

  const {data, isFetchingNextPage, fetchNextPage, hasNextPage, status} =
    useInfiniteQuery<EventListProps>({
      queryKey: ['events'],
      queryFn: getList,
      getNextPageParam: lastPage =>
        lastPage.currentPage < lastPage.totalPages
          ? lastPage.currentPage + 1
          : undefined,
      initialPageParam: 1,
      retry: 0,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Container>
      {data?.pages[0].totalCount === 0 ? (
        <NoList>아직 관심있는 행사가 없어요.</NoList>
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

const NoList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20rem;
  font-size: ${props => props.theme.sizes.l};
  color: ${props => props.theme.colors.neutral2};
`;

export default LikeList;
