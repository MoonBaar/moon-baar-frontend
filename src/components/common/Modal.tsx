import styled, {css, keyframes} from 'styled-components';
import ReactDOM from 'react-dom';
import {useEffect, useState} from 'react';
import {useModalStore} from '@/store/modal';
import {ReactComponent as Close} from '@/assets/img/close.svg';
import LoginButton from './LoginButton';
import Logo from '@/assets/img/moonbar.jpg';

function Modal() {
  const {isOpen, data, closeModal} = useModalStore();
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState<'in' | 'out'>('in');

  useEffect(() => {
    if (data && data.content && data.content.length > 1) {
      const intervalId = setInterval(() => {
        setFade('out');
        setTimeout(() => {
          setIdx(prev => (prev + 1) % 2);
          setFade('in');
        }, 800);
      }, 4000);

      return () => {
        setIdx(0);
        clearInterval(intervalId);
      };
    }
  }, []);

  if (!isOpen || !data) return null;

  return ReactDOM.createPortal(
    <>
      <Background onClick={closeModal} />
      <Container $height={data.height}>
        {data.type !== 'waiting' && (
          <Header>
            <CloseBtn onClick={closeModal}>
              <Close />
            </CloseBtn>
          </Header>
        )}
        <Body>
          {data.img && (
            <ImgWrap>
              <Img src={Logo} alt='logo' />
            </ImgWrap>
          )}
          <TitleWrap>{data.title}</TitleWrap>
          {data.subtitle && <SubtitleWrap>{data.subtitle}</SubtitleWrap>}
          {data.content && (
            <ContentWrap $fade={fade}>{data.content[idx]}</ContentWrap>
          )}
          {data.type === 'guest' && <LoginButton />}
        </Body>
      </Container>
    </>,
    document.body,
  );
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: inherit;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const Container = styled.div<{$height: number}>`
  width: 35rem;
  height: ${props => props.$height}rem;
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.colors.neutral4};
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1.5rem;
  z-index: 11;
  animation: moadlEffect 0.2s linear;

  @keyframes moadlEffect {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: 44rem) {
    width: calc(100% - 9rem);
  }
`;

const Header = styled.div`
  text-align: end;
`;

const CloseBtn = styled.button``;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: inherit;
`;

const TitleWrap = styled.p`
  font-size: ${props => props.theme.sizes.xl};
  font-weight: bold;
`;

const ImgWrap = styled.div`
  margin-bottom: 1.5rem;
`;

const Img = styled.img`
  width: 18rem;
  height: 18rem;
  object-fit: cover;
  border-radius: 50%;
`;

const SubtitleWrap = styled.p`
  font-size: ${props => props.theme.sizes.s};
  color: ${props => props.theme.colors.primary};
  margin-top: 0.5rem;
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const ContentWrap = styled.p<{$fade: 'in' | 'out'}>`
  font-size: ${props => props.theme.sizes.s};
  margin-top: 4.5rem;
  text-align: center;
  line-height: 2rem;
  word-break: keep-all;
  padding: 0 5rem;
  opacity: 0;

  animation: ${({$fade}) =>
    $fade === 'in'
      ? css`
          ${fadeIn} 0.8s forwards
        `
      : css`
          ${fadeOut} 0.8s forwards
        `};
`;

export default Modal;
