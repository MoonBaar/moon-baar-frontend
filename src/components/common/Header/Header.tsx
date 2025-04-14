import styled from 'styled-components';
import profile from '@/assets/img/profile.svg';
import search from '@/assets/img/search.svg';
import {useEventFilterStore} from '@/store/eventList';
import {useCallback, useEffect, useRef, useState} from 'react';
import close from '@/assets/img/close.svg';
import {useLocation, useNavigate} from 'react-router-dom';

function Header() {
  const [inputValue, setInputValue] = useState('');
  const {query, setQuery} = useEventFilterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = useRef(location.pathname);

  useEffect(() => {
    if (currentPath.current === '/event' && query) {
      setInputValue(query);
    }
  }, []);

  const handleSearch = useCallback(() => {
    setQuery(inputValue);
  }, [inputValue, setQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
    if (currentPath.current !== '/event') {
      navigate('/event');
    }
  };

  return (
    <HeaderContainer>
      <TitleWrap>
        <Title>문발</Title>
        <User>
          <div>김문화님</div>
          <img src={profile} alt='profile' />
        </User>
      </TitleWrap>
      {(currentPath.current === '/' || currentPath.current === '/event') && (
        <SearchBarWrap onSubmit={handleSubmit}>
          <SearchBar>
            <img src={search} alt='search' onClick={handleSearch} />
            <InputWrap
              type='text'
              placeholder='진행 중인 행사를 검색해보세요'
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            {currentPath.current === '/event' && query && (
              <CloseButton
                src={close}
                alt='close'
                onClick={() => {
                  setInputValue('');
                  setQuery(null);
                }}
              />
            )}
          </SearchBar>
        </SearchBarWrap>
      )}
    </HeaderContainer>
  );
}

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  max-width: 44rem;
  width: 100%;
  background-color: white;
  box-shadow:
    0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -2px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const TitleWrap = styled.div`
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
`;

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  font-size: ${props => props.theme.sizes.s};
  margin-right: 0.8rem;
  cursor: pointer;
`;

const SearchBarWrap = styled.form`
  display: flex;
  justify-content: center;
  padding: 0 1.6rem 1.6rem 1.6rem;
  width: 100%;
  height: 5.6rem;
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
  border: 1px solid #d1d5db;

  img {
    cursor: pointer;
  }
`;

const InputWrap = styled.input`
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
`;

const CloseButton = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  width: 1.2rem;
  height: 1.2rem;
  object-fit: cover;
  filter: invert(46%) sepia(20%) saturate(258%) hue-rotate(182deg)
    brightness(92%) contrast(92%);
  cursor: pointer;
`;

export default Header;
