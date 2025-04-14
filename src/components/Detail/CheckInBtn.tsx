import styled from 'styled-components';
import {ReactComponent as Add} from '@/assets/img/add.svg';

interface CheckInProps {
  isVisited: boolean;
}

function CheckInBtn({isVisited}: CheckInProps) {
  return (
    <BtnArea>
      <BtnWrap disabled={isVisited}>
        {isVisited ? (
          '방문 완료'
        ) : (
          <TextWrap>
            <Add />
            <p>방문 체크인 하기</p>
          </TextWrap>
        )}
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
