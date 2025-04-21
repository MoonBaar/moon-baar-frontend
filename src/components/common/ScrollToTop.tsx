import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export default function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    const shouldSkipScrollTop = /^\/event(\/.*)?$/.test(pathname);

    if (shouldSkipScrollTop) return;

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
