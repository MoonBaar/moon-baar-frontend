import styled from 'styled-components';
import map from '@/assets/img/map.svg';
import event from '@/assets/img/event.svg';
import badge from '@/assets/img/badge.svg';
import statistics from '@/assets/img/statistics.svg';
import {useLocation, useNavigate} from 'react-router-dom';
import {useRef} from 'react';
import {useScrollStore} from '@/store/eventList';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = useRef(location.pathname);
  const {setScrollY} = useScrollStore();

  const handleNavigation = (path: string) => {
    setScrollY(0);
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <FooterContainer>
      <NavItem
        $fillcolor={currentPath.current === '/'}
        onClick={() => handleNavigation('/')}
      >
        <img src={map} alt='map' />
        <div>지도</div>
      </NavItem>
      <NavItem
        $fillcolor={currentPath.current === '/event'}
        onClick={() => handleNavigation('/event')}
      >
        <img src={event} alt='event' />
        <div>행사</div>
      </NavItem>
      <NavItem
        $fillcolor={currentPath.current === '/badge'}
        onClick={() => handleNavigation('/badge')}
      >
        <img src={badge} alt='badge' />
        <div>배지</div>
      </NavItem>
      <NavItem
        $fillcolor={currentPath.current === '/statistics'}
        onClick={() => handleNavigation('/statistics')}
      >
        <img src={statistics} alt='statistics' />
        <div>통계</div>
      </NavItem>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  max-width: 44rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 6.5rem;
  background-color: white;
  border-top: 1px solid ${props => props.theme.colors.neutral4};
  z-index: 10;
`;

const NavItem = styled.div<{$fillcolor?: boolean}>`
  width: 4.8rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.theme.sizes.xs};
  color: ${props =>
    props.$fillcolor
      ? props.theme.colors.primary
      : props.theme.colors.neutral2};
  cursor: pointer;

  img {
    width: 2rem;
    height: 2rem;
    margin-bottom: 0.4rem;
    filter: ${props =>
      props.$fillcolor
        ? 'invert(62%) sepia(21%) saturate(653%) hue-rotate(111deg) brightness(87%) contrast(83%)'
        : 'none'};
  }
`;

export default Footer;
