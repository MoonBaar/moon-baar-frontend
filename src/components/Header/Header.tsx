import styled from 'styled-components';
import profile from '../../assets/img/profile.svg';
import search from '../../assets/img/search.png';

function Header() {
  return (
    <HeaderContainer>
      <TitleContainer>
        <Title>문발</Title>
        <User>
          <div>김문화님</div>
          <img src={profile} alt='profile' />
        </User>
      </TitleContainer>
      <SearchContainer>
        <SearchBar>
          <img src={search} alt='search' />
          <input type='text' placeholder='행사 검색' />
        </SearchBar>
      </SearchContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  max-width: 44rem;
  width: 100%;
  height: 12rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  box-shadow:
    0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -2px rgba(0, 0, 0, 0.1);
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 6.4rem;
  padding: 1.6rem;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.sizes.xl};
  font-weight: bold;
  color: white;
`;

const User = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  font-size: ${props => props.theme.sizes.s};
  color: white;
  margin-right: 0.8rem;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 1.6rem 1.6rem 1.6rem;
  width: 100%;
  height: 5.6rem;
  background-color: ${props => props.theme.colors.primary};
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  background-color: white;
  border-radius: 999rem;
  padding: 0.9rem 1rem 1rem 1.2rem;

  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    margin-left: 1rem;
    font-size: ${props => props.theme.sizes.m};
    color: ${props => props.theme.colors.neutral2};
    background-color: transparent;

    &::placeholder {
      color: ${props => props.theme.colors.neutral3};
    }
  }
`;

export default Header;
