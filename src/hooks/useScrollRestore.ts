import throttle from '@/utils/throttle';
import {useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';

interface UseScrollRestoreProps {
  scrollY: number;
  setScrollY: (y: number) => void;
  data?: {pages: {currentPage: number}[]};
  status: 'pending' | 'error' | 'success';
}

export function useScrollRestore({
  scrollY,
  setScrollY,
  data,
  status,
}: UseScrollRestoreProps) {
  const location = useLocation();
  const prevStatus = useRef(status);
  const prevPageLength = useRef<number | null>(null);

  // 새로고침 시 스크롤 위치 초기화
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo({top: 0});
      setScrollY(0);
      console.log('초기화');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [setScrollY]);

  // 스크롤 저장
  useEffect(() => {
    const throttledSave = throttle(() => {
      setScrollY(window.scrollY);
    }, 300);

    window.addEventListener('scroll', throttledSave);
    return () => window.removeEventListener('scroll', throttledSave);
  }, [location.pathname, setScrollY]);

  // 스크롤 복원
  useEffect(() => {
    // 'success' → 'pending'으로 바뀔 때만 초기화
    if (prevStatus.current === 'success' && status === 'pending') {
      console.log('데이터 로딩');
      window.scrollTo({top: 0, behavior: 'auto'});
      setScrollY(0);
      console.log('scrollY', scrollY);
      return;
    }
    if (data?.pages?.[0]?.currentPage === 1 && data.pages.length === 1) {
      window.scrollTo({top: 0, behavior: 'smooth'});
      setScrollY(0);
      console.log('페이지 1');
      return;
    }
    console.log('정상 복원');
    window.scrollTo({top: scrollY, behavior: 'auto'});

    // 항상 마지막에 이전 상태 저장
    prevStatus.current = status;
  }, [data, status]);
}
