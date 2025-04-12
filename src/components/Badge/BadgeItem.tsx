import {BadgeProps} from '@/pages/Badge';
import styled from 'styled-components';

function BadgeItem({isDone, name, img}: BadgeProps) {
  return (
    <ItemWrap $isDone={isDone}>
      <ImgWrap src={img} />
      <ContentWrap>
        <NameWrap>{name}</NameWrap>
        <StatusWrap $isDone={isDone}>
          {isDone ? '획득 완료' : '미획득'}
        </StatusWrap>
      </ContentWrap>
    </ItemWrap>
  );
}

const ItemWrap = styled.div<{$isDone: boolean}>`
  width: 18rem;
  min-height: 8.2rem;
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
  padding: 1.6rem;
  display: flex;
  align-items: center;
`;

const ImgWrap = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 50%;
`;

const ContentWrap = styled.div`
  margin-left: 1.2rem;
`;

const NameWrap = styled.p`
  font-size: ${props => props.theme.sizes.m};
  margin-bottom: 0.5rem;
  word-break: keep-all;
`;

const StatusWrap = styled.p<{$isDone: boolean}>`
  color: ${props =>
    props.$isDone
      ? props => props.theme.colors.primary
      : props => props.theme.colors.neutral2};
  font-size: ${props => props.theme.sizes.s};
`;

export default BadgeItem;
