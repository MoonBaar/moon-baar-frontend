import styled from 'styled-components';
import map from '@/assets/img/map.svg';
import event from '@/assets/img/event.svg';
import badge from '@/assets/img/badge.svg';
import statistics from '@/assets/img/statistics.svg';
import {useNavigate} from 'react-router-dom';

function Footer({page}: {page: string}) {
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <NavItem $fillcolor={page === 'map'} onClick={() => navigate('/')}>
        <img src={map} alt='map' />
        <div>지도</div>
      </NavItem>
      <NavItem $fillcolor={page === 'event'} onClick={() => navigate('/event')}>
        <img src={event} alt='event' />
        <div>행사</div>
      </NavItem>
      <NavItem $fillcolor={page === 'badge'} onClick={() => navigate('/badge')}>
        <img src={badge} alt='badge' />
        <div>배지</div>
      </NavItem>
      <NavItem
        $fillcolor={page === 'statistics'}
        onClick={() => navigate('/statistics')}
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
