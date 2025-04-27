import styled from 'styled-components';
import search from '@/assets/img/search.svg';
import {useEventFilterStore} from '@/store/eventList';
import {useCallback, useEffect, useRef, useState} from 'react';
import close from '@/assets/img/close.svg';
import {useLocation, useNavigate} from 'react-router-dom';
import {Overlay} from '@/components/Event/FilterItem';
import {deleteUser, logout} from '@/apis/api/users';
import moonbarIcon from '@/assets/img/moonbarIcon.jpg';
import {useAuthStore} from '@/store/user';

function Header() {
  const [inputValue, setInputValue] = useState('');
  const {query, setQuery} = useEventFilterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = useRef(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useAuthStore();

  useEffect(() => {
    if (currentPath.current === '/event' && query) {
      setInputValue(query);
    }
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteUser = async () => {
    await deleteUser();
  };

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
      <HeaderWrap>
        <TitleWrap>
          <img src={moonbarIcon} alt='moonbar' />
          <Title>문발</Title>
        </TitleWrap>
        {user ? (
          <UserWrap $isOpen={isOpen}>
            <User onClick={() => setIsOpen(prev => !prev)}>
              <div>{user.nickname}</div>
              <img src={user.profileImageUrl} alt='profile' />
            </User>
            <UserMenuWrap $isOpen={isOpen}>
              <UserMenu onClick={handleLogout}>로그아웃</UserMenu>
              <UserMenu onClick={handleDeleteUser}>회원탈퇴</UserMenu>
            </UserMenuWrap>
          </UserWrap>
        ) : (
          <LoginButton onClick={() => navigate('/login')}>
            로그인 하기
          </LoginButton>
        )}
      </HeaderWrap>
      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
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

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 6.4rem;
  padding: 1.6rem;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  img {
    width: 3.2rem;
    height: 3.2rem;
  }
`;

const Title = styled.h1`
  font-size: ${props => props.theme.sizes.xl};
  font-weight: bold;
`;

const UserWrap = styled.div<{$isOpen: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: fit-content;
  position: absolute;
  top: 0.8rem;
  right: 1rem;
  background-color: ${props =>
    props.$isOpen ? props.theme.colors.primary : 'white'};
  color: ${props => (props.$isOpen ? 'white' : props.theme.colors.neutral1)};
  font-size: ${props => props.theme.sizes.s};
  border-radius: 0.8rem;
  z-index: 15;
  box-shadow: ${({$isOpen}) =>
    $isOpen
      ? '4px 6px 4px -2px rgba(0, 0, 0, 0.1), 4px 2px 4px -2px rgba(0, 0, 0, 0.1)'
      : 'none'};

  max-height: ${({$isOpen}) => ($isOpen ? '12.8rem' : '4.8rem')};
  transition: all 0.3s ease-in-out;
`;

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  cursor: pointer;

  img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const UserMenuWrap = styled.div<{$isOpen: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 0 0 0.8rem 0.8rem;

  max-height: ${({$isOpen}) => ($isOpen ? '8rem' : '0')};
  opacity: ${({$isOpen}) => ($isOpen ? '1' : '0')};
  transition: all 0.3s ease-in-out;
  pointer-events: ${({$isOpen}) => ($isOpen ? 'auto' : 'none')};
`;

const UserMenu = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  color: white;
  border-top: 1px solid ${props => props.theme.colors.neutral5};
`;

const LoginButton = styled.button`
  font-size: ${props => props.theme.sizes.s};
  color: ${props => props.theme.colors.neutral1};
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
