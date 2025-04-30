import {emptyHeight} from '@/assets/data/constant';
import Layout from '@/components/common/Layout';
import styled from 'styled-components';
import Moonbar from '@/assets/img/moonbar.jpg';
import {ReactComponent as Kakao} from '@/assets/img/kakao.svg';
import {ReactComponent as Naver} from '@/assets/img/naver.svg';
import {loginOauth} from '@/apis/api/users';
import {useNavigate} from 'react-router-dom';
import {useAuthStore} from '@/store/user';

function Login() {
  const navigate = useNavigate();
  const {setIsGuest} = useAuthStore();

  const handleOnClickGuest = () => {
    setIsGuest(true);
    useAuthStore.getState().setUser(null);
    navigate('/event');
  };
  return (
    <Layout headerHeight={emptyHeight} footerHeight={emptyHeight}>
      <Container>
        <TitleWrap>
          <SubTitle>문화 발자국</SubTitle>
          <Title>
            <span>문</span>
            <span>발</span>
          </Title>
        </TitleWrap>
        <img src={Moonbar} alt='Moonbar' />
        <LoginWrap>
          <LoginButton option='kakao' onClick={() => loginOauth('kakao')}>
            <Kakao width={22} height={22} />
            <div>카카오로 시작하기</div>
          </LoginButton>
          <LoginButton option='naver' onClick={() => loginOauth('naver')}>
            <Naver width={18} height={18} />
            <div>네이버로 시작하기</div>
          </LoginButton>
          <GuestButton onClick={handleOnClickGuest}>앱 둘러보기</GuestButton>
        </LoginWrap>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 5.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  gap: 3rem;

  img {
    width: 16rem;
    height: 16rem;
  }
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubTitle = styled.h3`
  font-size: ${props => props.theme.sizes.s};
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  gap: 0.6rem;

  span {
    font-size: 3.2rem;
    line-height: 4rem;
    font-weight: bold;
  }
`;

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
  margin-top: 10rem;
`;

const LoginButton = styled.button<{option: string}>`
  width: 100%;
  height: 5.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: ${props =>
    props.option === 'kakao' ? '#FEE500' : '#03C75A'};
  border-radius: 0.4rem;

  div {
    font-size: ${props => props.theme.sizes.s};
    font-weight: 500;
    color: ${props => props.option === 'naver' && '#ffffff'};
  }
`;

const GuestButton = styled.button`
  width: fit-content;
  font-weight: 500;
  color: ${props => props.theme.colors.neutral2};
  border-bottom: 1px solid ${props => props.theme.colors.neutral2};
`;

export default Login;
