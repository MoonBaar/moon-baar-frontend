import {SkeletonAnimation} from '@/styles/common';
import styled from 'styled-components';

function BadgeItemSkeleton() {
  return (
    <SkeletonContainer>
      <SkeletonContent>
        <SkeletonImage />
      </SkeletonContent>
      <SkeletonName />
    </SkeletonContainer>
  );
}

const SkeletonContainer = styled.div`
  width: 10rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SkeletonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.colors.neutral4};
  border-radius: 8px;
  width: 100%;
  height: 10rem;
  margin-bottom: 0.5rem;
`;

const SkeletonImage = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  ${SkeletonAnimation};
`;

const SkeletonName = styled.div`
  width: 90%;
  height: 2rem;
  ${SkeletonAnimation};
`;

export default BadgeItemSkeleton;
