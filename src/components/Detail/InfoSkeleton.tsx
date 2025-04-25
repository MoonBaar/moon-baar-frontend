import styled, {css} from 'styled-components';

function InfoSkeleton() {
  return (
    <SkeletonContainer>
      <SkeletonImage />
      <SkeletonContent>
        <SkeletonTitle />
        <SkeletonWrap>
          <SkeletonLine width='60%' height='3.5rem' />
          <SkeletonLine width='60%' />
          <SkeletonLine width='40%' />
          <SkeletonLine width='40%' />
          <SkeletonLine width='40%' />
          <SkeletonLine width='100%' />
        </SkeletonWrap>
      </SkeletonContent>
      <SkeletonButton />
      <SkeletonContent>
        <SkeletonLine width='20%' height='1.8rem' />
        <SkeletonItemWrap>
          <SkeletonLine width='10%' height='6.1rem' />
          <SkeletonLine width='10%' height='6.1rem' />
        </SkeletonItemWrap>
      </SkeletonContent>
      <SkeletonContent>
        <SkeletonLine width='20%' height='1.8rem' />
      </SkeletonContent>
      <SkeletonImage />
    </SkeletonContainer>
  );
}

const SkeletonAnimation = css`
  background: linear-gradient(90deg, #eeeeee 25%, #dddddd 37%, #eeeeee 63%);
  background-size: 400% 100%;
  animation: loading 1.4s ease infinite;

  @keyframes loading {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 25rem;
  ${SkeletonAnimation}
`;

const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  width: 100%;
`;

const SkeletonTitle = styled.div`
  width: 100%;
  height: 5.6rem;
  margin-bottom: 1.6rem;
  border-radius: 0.4rem;
  ${SkeletonAnimation}
`;

const SkeletonWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SkeletonLine = styled.div<{width: string; height?: string}>`
  width: ${({width}) => width};
  height: ${({height}) => (height ? height : '1.6rem')};
  border-radius: 0.4rem;
  ${SkeletonAnimation}
`;

const SkeletonButton = styled.div`
  width: calc(100% - 3.2rem);
  height: 5rem;
  border-radius: 0.8rem;
  ${SkeletonAnimation}
`;

const SkeletonItemWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10rem;
`;

export default InfoSkeleton;
