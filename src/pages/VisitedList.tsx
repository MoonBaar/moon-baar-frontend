import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {QueryFunctionContext, useInfiniteQuery} from '@tanstack/react-query';
import {useInView} from 'react-intersection-observer';
import {getVisitList} from '@/apis/api/event';
import {EventListProps} from '@/assets/types/event';
import DetailHeader from '@/components/common/Header/DetailHeader';
import styled from 'styled-components';
import NoList from '@/components/common/NoList';
import EventItemSkeleton from '@/components/Event/EventItemSkeleton';
import EventItem from '@/components/Event/EventItem';
import Layout from '@/components/common/Layout';
import {basicHeight, emptyHeight} from '@/assets/data/constant';
import {useScrollStore} from '@/store/eventList';

const getTitle = (range: string) => {
  switch (range) {
    case 'thisMonth':
      return '이번 달 방문한 행사';
    case 'all':
      return '총 방문 행사';
    default:
      return '방문한 행사';
  }
};

function VisitedList() {
  const range = useParams().range || 'all';
  const title = getTitle(range || '');
  const [ref, inView] = useInView();
  const {scrollY} = useScrollStore();

  const getList = async ({pageParam}: QueryFunctionContext) => {
    const data = await getVisitList(pageParam as number, range);
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
    });

  useEffect(() => {
    if (scrollY! == 0) {
      window.scrollTo(0, scrollY);
    }
  }, [scrollY]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <DetailHeader name={title} />
      <Layout headerHeight={basicHeight} footerHeight={emptyHeight}>
        <ListWrap>
          {data?.pages[0].totalCount === 0 ? (
            <NoList type='방문한' />
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
                page.events.map(event => (
                  <EventItem key={event.id} data={event} />
                )),
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
        </ListWrap>
      </Layout>
    </>
  );
}

const ListWrap = styled.div`
  padding: 0 2rem;
`;

export default VisitedList;
