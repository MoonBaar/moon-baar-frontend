import styled from 'styled-components';
import ReactDOM from 'react-dom';
import {basicHeight} from '@/assets/data/constant';
import {usePopupStore} from '@/store/popup';

function Popup() {
  const {isOpen, data, closePopup} = usePopupStore();

  if (!isOpen || !data) return null;

  return ReactDOM.createPortal(
    <>
      <PopupBackground onClick={closePopup} />
      <Container>
        <ImgWrap src={data.imgUrl} alt='badge' />
        <NameWrap>{data.name}</NameWrap>
        <DescriptionWrap>{data.description}</DescriptionWrap>
      </Container>
    </>,
    document.body,
  );
}

const PopupBackground = styled.div`
  position: fixed;
  bottom: ${basicHeight};
  left: 50%;
  transform: translate(-50%, 0);
  width: inherit;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: 26rem;
  position: fixed;
  bottom: ${basicHeight};
  background-color: white;
  padding: 1.5rem;
  z-index: 11;
  border-radius: 25px 25px 0 0;
  animation: popupEffect 0.2s linear;

  @keyframes popupEffect {
    from {
      bottom: 0;
    }
    to {
      bottom: ${basicHeight};
    }
  }
`;

const ImgWrap = styled.img`
  width: 12rem;
  height: 12rem;
  padding: 1rem;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.neutral4};
  margin-bottom: 1.5rem;
`;

const NameWrap = styled.div`
  font-size: ${props => props.theme.sizes.xl};
  font-weight: bold;
  margin-bottom: 2.5rem;
`;

const DescriptionWrap = styled.div`
  font-size: ${props => props.theme.sizes.m};
  color: ${props => props.theme.colors.neutral2};
`;

export default Popup;
