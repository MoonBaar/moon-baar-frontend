import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

interface CountProps {
  title: string;
  count: number;
  isMonth?: boolean;
  range: string;
}

function Count({title, count, range, isMonth = false}: CountProps) {
  const navigate = useNavigate();

  return (
    <CountWrap $isMonth={isMonth} onClick={() => navigate(`/visited/${range}`)}>
      <p>{title}</p>
      {count}회
    </CountWrap>
  );
}

const CountWrap = styled.button<{$isMonth: boolean}>`
  width: 100%;
  height: 7.5rem;
  color: ${props => props.theme.colors.neutral1};
  font-size: ${props => props.theme.sizes.xl};
  font-weight: bold;
  background-color: ${props =>
    props.$isMonth ? '#f0fdf4' : props.theme.colors.secondary};
  border-radius: 8px;
  padding: 1.2rem;
  text-align: left;

  & p {
    font-size: ${props => props.theme.sizes.s};
    font-weight: normal;
    color: ${props => props.theme.colors.primary};
  }
`;

export default Count;
