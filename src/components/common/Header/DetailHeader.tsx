import styled from 'styled-components';
import {HeaderContainer} from './Header';
import {ReactComponent as Back} from '@/assets/img/back.svg';
import {useNavigate} from 'react-router-dom';

function DetailHeader({name}: {name: string}) {
  const navigate = useNavigate();
  return (
    <DetailHeaderContainer>
      <BackBtn onClick={() => navigate(-1)}>
        <Back />
      </BackBtn>
      {name}
    </DetailHeaderContainer>
  );
}

const DetailHeaderContainer = styled(HeaderContainer)`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 6.5rem;
  padding: 2rem;
  font-size: ${props => props.theme.sizes.l};
  font-weight: bold;
`;

const BackBtn = styled.button`
  height: 2.4rem;
`;

export default DetailHeader;
