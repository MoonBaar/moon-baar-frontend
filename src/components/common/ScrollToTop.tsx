import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export default function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    const skipRestorePaths = ['/event', '/statistics', '/visited'];

    if (skipRestorePaths.includes(pathname)) return;

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
