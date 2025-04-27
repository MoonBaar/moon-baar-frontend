import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

function LoginButton() {
  const navigate = useNavigate();
  return (
    <LoginButtonWrap onClick={() => navigate('/login')}>
      로그인하러 가기
    </LoginButtonWrap>
  );
}

const LoginButtonWrap = styled.button`
  padding: 1.2rem 1.6rem;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 2.4rem;
`;

export default LoginButton;
