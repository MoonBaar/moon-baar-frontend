import {BadgeProps} from '@/pages/Badge';
import styled from 'styled-components';

function BadgeItem({isDone, name, img}: BadgeProps) {
  return (
    <ItemWrap>
      <ContentWrap $isDone={isDone}>
        <ImgWrap src={img} />
      </ContentWrap>
      <NameWrap>{name}</NameWrap>
    </ItemWrap>
  );
}

const ItemWrap = styled.div`
  width: 10rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrap = styled.div<{$isDone: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.$isDone
      ? props => props.theme.colors.secondary
      : props => props.theme.colors.neutral6};
  border: 1px solid
    ${props =>
      props.$isDone
        ? props => props.theme.colors.neutral_green
        : props => props.theme.colors.neutral4};
  border-radius: 8px;
  width: 100%;
  height: 10rem;
  margin-bottom: 0.5rem;
`;

const ImgWrap = styled.img`
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  border-radius: 50%;
`;

const NameWrap = styled.p`
  width: 90%;
  font-size: ${props => props.theme.sizes.m};
  word-break: keep-all;
  text-align: center;
  line-height: 2.4rem;
`;

export default BadgeItem;
