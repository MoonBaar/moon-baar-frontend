import styled from 'styled-components';
import EventList from '@/components/Event/EventList';
import {useState} from 'react';
import {useEventFilterStore} from '@/store/eventList';
import FilterItem from '@/components/Event/FilterItem';
import filter from '@/assets/img/filter.png';
import Layout from '@/components/common/Layout';
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer';
import {
  categoryOption,
  districtOption,
  isFreeOption,
} from '@/assets/data/filter';
import {searchHeight} from '@/assets/data/constant';

function Event() {
  const {
    category,
    isFree,
    district,
    setCategory,
    setIsFree,
    setDistrict,
    resetAllFilters,
  } = useEventFilterStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header />
      <Layout headerHeight={searchHeight}>
        <ListHeader>
          <ListHeaderWrap>
            <Title>문화행사</Title>
            <FilterButtonContainer>
              <FilterButton
                onClick={() => setIsOpen(prev => !prev)}
                $isOpen={isOpen}
              >
                필터
                <img src={filter} alt='filter' />
              </FilterButton>
            </FilterButtonContainer>
          </ListHeaderWrap>
          <FilterListContainer $isOpen={isOpen}>
            <ResetButton
              onClick={resetAllFilters}
              $hasFilter={
                category !== null || isFree !== null || district !== null
              }
            >
              전체
            </ResetButton>
            <FilterItem
              label='카테고리'
              options={categoryOption.map(option => option.value)}
              selectedValue={category}
              onSelect={setCategory}
            />
            <FilterItem
              label='유/무료'
              options={isFreeOption.map(option => option.value)}
              selectedValue={isFree}
              onSelect={setIsFree}
            />
            <FilterItem
              label='자치구'
              options={districtOption.map(option => option.value)}
              selectedValue={district}
              onSelect={setDistrict}
            />
          </FilterListContainer>
        </ListHeader>
        <EventList />
      </Layout>
      <Footer />
    </>
  );
}

const ListHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.6rem 0.8rem 0.8rem 1.6rem;
  position: sticky;
  top: 12rem;
  width: 100%;
  max-width: 44rem;
  background-color: white;
`;

const ListHeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: ${props => props.theme.sizes.l};
  font-weight: bold;
  line-height: 2.8rem;
  text-align: center;
`;

const FilterButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterButton = styled.button<{$isOpen: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.48rem 1.2rem;
  font-size: ${props => props.theme.sizes.s};
  background-color: ${props =>
    props.$isOpen ? props.theme.colors.secondary : props.theme.colors.neutral5};
  color: ${props => props.theme.colors.primary};
  border-radius: 1.6rem;

  img {
    width: 1.6rem;
    height: 1.6rem;
    margin-left: 0.4rem;
  }
`;

const FilterListContainer = styled.div<{$isOpen: boolean}>`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;

  max-height: ${({$isOpen}) => ($isOpen ? '500px' : '0')};
  margin-top: ${({$isOpen}) => ($isOpen ? '0.8rem' : '0')};
  opacity: ${({$isOpen}) => ($isOpen ? '1' : '0')};
  transition: all 0.3s ease-in-out;
`;

const ResetButton = styled.button<{$hasFilter: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.48rem 1.2rem;
  font-size: ${props => props.theme.sizes.s};
  background-color: ${props =>
    props.$hasFilter
      ? props.theme.colors.neutral5
      : props.theme.colors.secondary};
  color: ${props => props.theme.colors.primary};
  border-radius: 1.6rem;
`;

export default Event;
