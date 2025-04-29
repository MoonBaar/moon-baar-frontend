import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

interface LoginButtonProps {
  comment?: string;
  size?: string;
}

function LoginButton({comment, size = 'm'}: LoginButtonProps) {
  const navigate = useNavigate();
  return (
    <>
      <Comment>{comment}</Comment>
      <LoginButtonWrap onClick={() => navigate('/login')} size={size}>
        {size === 's' ? '로그인' : '로그인하러 가기'}
      </LoginButtonWrap>
    </>
  );
}

const Comment = styled.div`
  margin-bottom: 1.8rem;
`;

const LoginButtonWrap = styled.button<{size: string}>`
  padding: ${({size}) => (size === 's' ? '1rem 1.4rem' : '1.2rem 1.6rem')};
  color: white;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 2.4rem;
`;

export default LoginButton;
