import styled from 'styled-components';

interface NoListProps {
  type: string;
}

function NoList({type}: NoListProps) {
  return <Wrap>아직 {type} 행사가 없어요.</Wrap>;
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem 0;
  font-size: ${props => props.theme.sizes.l};
  color: ${props => props.theme.colors.neutral2};
`;

export default NoList;
