import styled from 'styled-components';
import {useModalStore} from '@/store/modal';
import {ReactComponent as Add} from '@/assets/img/add.svg';
import {modalHeightL, modalHeightM} from '@/assets/data/constant';
import {useGeoLocation} from '@/hooks/useGeoLocation';
import {postVisit} from '@/apis/api/event';
import {User} from '@/store/user';
import Logo from '@/assets/img/logo.png';

interface CheckInProps {
  id: number;
  user: User | null;
}

function CheckInBtn({id, user}: CheckInProps) {
  const {openModal} = useModalStore();
  const {location, error} = useGeoLocation();

  const handleAuthVisited = async () => {
    try {
      if (error) throw error;
      if (location) {
        await postVisit(id, location.latitude, location.longitude);
        openModal({
          type: 'success',
          height: modalHeightM,
          title: '체크인 완료!',
        });
      }
    } catch (err) {
      openModal({
        type: 'fail',
        height: modalHeightM,
        title: '체크인에 실패했습니다.',
        content: [err as string],
      });
    }
  };

  const handleClick = () => {
    if (!user) {
      openModal({
        type: 'guest',
        height: modalHeightM,
        title: '로그인이 필요합니다',
      });
    } else {
      openModal({
        type: 'waiting',
        height: modalHeightL,
        title: '체크인 중...',
        img: Logo,
        content: [
          '기간 안에 해당 위치에 있으면 체크인이 완료됩니다.',
          '동일한 행사는 하루에 한 번만 체크인 가능해요.',
        ],
      });
      handleAuthVisited();
    }
  };

  return (
    <BtnArea>
      <BtnWrap onClick={handleClick}>
        <TextWrap>
          <Add />
          <p>방문 체크인 하기</p>
        </TextWrap>
      </BtnWrap>
    </BtnArea>
  );
}

const BtnArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const BtnWrap = styled.button`
  width: calc(100% - 3.2rem);
  height: 5rem;
  background-color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.sizes.m};
  color: white;
  border-radius: 8px;
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
`;

export default CheckInBtn;
