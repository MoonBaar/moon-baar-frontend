import styled from 'styled-components';
import {BadgeProps} from '@/assets/types/badge';
import {usePopupStore} from '@/store/popup';

interface BadgeItemProps {
  data: BadgeProps;
}

function BadgeItem({data}: BadgeItemProps) {
  const {openPopup} = usePopupStore();

  const handleClick = () => {
    openPopup({
      name: data.name,
      imgUrl: data.imgUrl || '',
      description: data.description,
    });
  };

  return (
    <ItemWrap onClick={handleClick}>
      <ContentWrap $owned={data.owned}>
        <ImgWrap src={data.imgUrl || ''} $owned={data.owned} />
      </ContentWrap>
      <NameWrap>{data.name}</NameWrap>
    </ItemWrap>
  );
}

const ItemWrap = styled.div`
  width: 10rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ContentWrap = styled.div<{$owned: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.$owned
      ? props => props.theme.colors.secondary
      : props => props.theme.colors.neutral6};
  border: 1px solid
    ${props =>
      props.$owned
        ? props => props.theme.colors.neutral_green
        : props => props.theme.colors.neutral4};
  border-radius: 8px;
  width: 100%;
  height: 10rem;
  margin-bottom: 0.5rem;
`;

const ImgWrap = styled.img<{$owned: boolean}>`
  width: 7rem;
  height: 7rem;
  object-fit: cover;
  border-radius: 50%;
  filter: ${props => (props.$owned ? 'grayscale(0)' : 'grayscale(1)')};
`;

const NameWrap = styled.p`
  width: 90%;
  font-size: ${props => props.theme.sizes.m};
  word-break: keep-all;
  text-align: center;
  line-height: 2.4rem;
`;

export default BadgeItem;
