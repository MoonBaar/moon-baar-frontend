import styled from 'styled-components';
import EventList from '@/components/Event/EventList';
import {
  useEventFilterStore,
  useIsOpenStore,
  useScrollStore,
} from '@/store/eventList';
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
import dropdown from '@/assets/img/dropdown.png';
import calendar from '@/assets/img/calendar.svg';
import {useEffect, useState} from 'react';
import CalendarFilter from '@/components/Event/CalendarFilter';
import close from '@/assets/img/close.svg';
import {
  CloseImage,
  DropDownImage,
  SvgImg,
  Title,
  TriggerButton,
} from '@/styles/common';
import FilterItem from '@/components/Event/FilterItem';

function Event() {
  const {
    query,
    categoryFilter,
    isFreeFilter,
    districtFilter,
    startDate,
    setCategoryFilter,
    setIsFreeFilter,
    setDistrictFilter,
    setStartDate,
    resetStartDate,
    resetAllFilters,
  } = useEventFilterStore();
  const {isOpen, toggleIsOpen} = useIsOpenStore();
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const {scrollY} = useScrollStore();

  const handleReset = (e: React.MouseEvent) => {
    setIsOpenCalendar(false);
    resetStartDate();
    e.stopPropagation();
  };

  useEffect(() => {
    if (scrollY !== 0) {
      window.scrollTo(0, scrollY);
    }
  }, [scrollY]);

  return (
    <>
      <Header />
      <Layout headerHeight={searchHeight}>
        <EventContainer>
          <ListHeader>
            <ListHeaderWrap>
              <Title>문화행사</Title>
              <FilterButtonContainer>
                <FilterButton onClick={toggleIsOpen} $isOpen={isOpen}>
                  필터
                  <img src={filter} alt='filter' />
                </FilterButton>
              </FilterButtonContainer>
            </ListHeaderWrap>
            <FilterListContainer $isOpen={isOpen}>
              <ResetButton
                onClick={resetAllFilters}
                $hasFilter={
                  categoryFilter !== null ||
                  isFreeFilter !== null ||
                  districtFilter !== null ||
                  startDate !== null
                }
              >
                전체
              </ResetButton>
              <FilterItem
                label='카테고리'
                options={categoryOption.map(option => option)}
                selectedValue={categoryFilter}
                onSelect={setCategoryFilter}
                setOpenCalendar={setIsOpenCalendar}
              />
              <FilterItem
                label='유/무료'
                options={isFreeOption.map(option => option)}
                selectedValue={isFreeFilter}
                onSelect={setIsFreeFilter}
                setOpenCalendar={setIsOpenCalendar}
              />
              <FilterItem
                label='자치구'
                options={districtOption.map(option => option)}
                selectedValue={districtFilter}
                onSelect={setDistrictFilter}
                setOpenCalendar={setIsOpenCalendar}
              />
              <>
                <TriggerButton
                  $isSelectedValue={startDate !== null}
                  onClick={() => setIsOpenCalendar(prev => !prev)}
                >
                  {startDate ? (
                    <>
                      {startDate}
                      <CloseImage
                        src={close}
                        alt='close'
                        onClick={handleReset}
                      />
                    </>
                  ) : (
                    <>
                      <CalendarImage src={calendar} alt='calendar' />
                      <DropDownImage src={dropdown} alt='dropdown' />
                    </>
                  )}
                </TriggerButton>
                <CalendarOption $isOpenCalendar={isOpenCalendar}>
                  <CalendarFilter
                    startDate={startDate}
                    setStartDate={setStartDate}
                    setIsOpenCalendar={setIsOpenCalendar}
                  />
                </CalendarOption>
              </>
            </FilterListContainer>
          </ListHeader>
          <EventList
            query={query}
            categoryFilter={categoryFilter}
            isFreeFilter={isFreeFilter}
            districtFilter={districtFilter}
            startDate={startDate}
          />
        </EventContainer>
      </Layout>
      <Footer />
    </>
  );
}

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  min-height: inherit;
`;

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

const CalendarImage = styled(SvgImg)`
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.2rem;
`;

const CalendarOption = styled.div<{$isOpenCalendar: boolean}>`
  background-color: white;
  position: static;
  width: 100%;
  padding-right: 0.8rem;

  max-height: ${({$isOpenCalendar}) => ($isOpenCalendar ? 'max-content' : '0')};
  opacity: ${({$isOpenCalendar}) => ($isOpenCalendar ? '1' : '0')};
  transition: all 0.3s ease-in-out;
  pointer-events: ${({$isOpenCalendar}) => ($isOpenCalendar ? 'auto' : 'none')};
`;

export default Event;
