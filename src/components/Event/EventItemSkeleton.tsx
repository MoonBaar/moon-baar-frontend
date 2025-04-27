import {SkeletonAnimation} from '@/styles/common';
import styled from 'styled-components';

function EventItemSkeleton() {
  return (
    <SkeletonContainer>
      <SkeletonImage />
      <SkeletonContent>
        <SkeletonFilters>
          <SkeletonFilter />
          <SkeletonFilter />
        </SkeletonFilters>
        <SkeletonTitle />
        <SkeletonLine width='60%' />
        <SkeletonLine width='40%' />
        <SkeletonButton />
      </SkeletonContent>
    </SkeletonContainer>
  );
}

const SkeletonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  padding-bottom: 1.2rem;
  border-bottom: 0.8px solid ${({theme}) => theme.colors.neutral4};
`;

const SkeletonImage = styled.div`
  width: 10rem;
  height: 13rem;
  border-radius: 0.4rem;
  ${SkeletonAnimation}
`;

const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
`;

const SkeletonFilters = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const SkeletonFilter = styled.div`
  width: 4.8rem;
  height: 2rem;
  border-radius: 1.6rem;
  ${SkeletonAnimation}
`;

const SkeletonTitle = styled.div`
  width: 80%;
  height: 4.8rem;
  border-radius: 0.4rem;
  ${SkeletonAnimation}
`;

const SkeletonLine = styled.div<{width: string}>`
  width: ${({width}) => width};
  height: 1.6rem;
  border-radius: 0.4rem;
  ${SkeletonAnimation}
`;

const SkeletonButton = styled.div`
  width: 6rem;
  height: 2rem;
  border-radius: 1.6rem;
  ${SkeletonAnimation}
`;

export default EventItemSkeleton;
