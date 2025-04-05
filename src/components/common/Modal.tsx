import styled from 'styled-components';
import ReactDOM from 'react-dom';
import {ReactComponent as Close} from '@/assets/img/close.svg';
import {useModalStore} from '@/store/modal';

function Modal() {
  const {isOpen, data, closeModal} = useModalStore();

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
              <Img src={data.img} alt='logo' />
            </ImgWrap>
          )}
          <TitleWrap>{data.title}</TitleWrap>
          {data.subtitle && <SubtitleWrap>{data.subtitle}</SubtitleWrap>}
          {data.content && <ContentWrap>{data.content}</ContentWrap>}
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
const ContentWrap = styled.p`
  font-size: ${props => props.theme.sizes.s};
  margin-top: 4.5rem;
  text-align: center;
  line-height: 2rem;
  word-break: keep-all;
  padding: 0 4rem;
`;

export default Modal;
