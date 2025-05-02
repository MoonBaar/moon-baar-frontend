import styled from 'styled-components';
import EventItemSkeleton from '../Event/EventItemSkeleton';
import NoList from '../common/NoList';
import EventItem from '../Event/EventItem';
import {EventListProps} from '@/assets/types/event';
import {InfiniteData} from '@tanstack/react-query';
import {forwardRef} from 'react';

interface MonthlyEventListProps {
  data: InfiniteData<EventListProps, unknown> | undefined;
  status: 'pending' | 'error' | 'success';
  isFetchingNextPage: boolean;
}

const MonthlyEventList = forwardRef<HTMLDivElement, MonthlyEventListProps>(
  ({data, status, isFetchingNextPage}, ref) => {
    return (
      <MonthlyEventWrap>
        {data?.pages[0].totalCount === 0 ? (
          <NoList type='방문한' />
        ) : (
          <>
            {status === 'pending' &&
              Array.from({length: 3}).map((_, i) => (
                <EventItemSkeleton key={i} />
              ))}
            {data?.pages.map(page =>
              page.events.map(event => (
                <EventItem key={event.id} data={event} />
              )),
            )}
            {isFetchingNextPage ? (
              Array.from({length: 3}).map((_, i) => (
                <EventItemSkeleton key={`skeleton-${i}`} />
              ))
            ) : (
              <div ref={ref} />
            )}
          </>
        )}
      </MonthlyEventWrap>
    );
  },
);

MonthlyEventList.displayName = 'MonthlyEventList';

const MonthlyEventWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default MonthlyEventList;
