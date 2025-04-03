import styled from 'styled-components';
import map from '../assets/img/map.svg';
import event from '../assets/img/event.svg';
import badge from '../assets/img/badge.svg';
import statistics from '../assets/img/statistics.svg';
import {useNavigate} from 'react-router-dom';

function BottomNav({page}: {page: string}) {
  const navigate = useNavigate();

  return (
    <Container>
      <NavItem fillColor={page === 'map'} onClick={() => navigate('/')}>
        <img src={map} alt='map' />
        <div>지도</div>
      </NavItem>
      <NavItem fillColor={page === 'event'} onClick={() => navigate('/event')}>
        <img src={event} alt='event' />
        <div>행사</div>
      </NavItem>
      <NavItem fillColor={page === 'badge'} onClick={() => navigate('/badge')}>
        <img src={badge} alt='badge' />
        <div>배지</div>
      </NavItem>
      <NavItem
        fillColor={page === 'statistics'}
        onClick={() => navigate('/statistics')}
      >
        <img src={statistics} alt='statistics' />
        <div>통계</div>
      </NavItem>
    </Container>
  );
}

const Container = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 6.5rem;
  background-color: white;
  border-top: 1px solid ${props => props.theme.colors.neutral4};
`;

const NavItem = styled.div<{fillColor?: boolean; page?: string}>`
  width: 4.8rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.theme.sizes.xs};
  color: ${props =>
    props.fillColor ? props.theme.colors.primary : props.theme.colors.neutral2};
  cursor: pointer;

  img {
    width: 2rem;
    height: 2rem;
    margin-bottom: 0.4rem;
    filter: ${props =>
      props.fillColor
        ? 'invert(62%) sepia(21%) saturate(653%) hue-rotate(111deg) brightness(87%) contrast(83%)'
        : 'none'};
  }
`;

export default BottomNav;
