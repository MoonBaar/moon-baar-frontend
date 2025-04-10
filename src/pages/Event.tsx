import styled from 'styled-components';
import Footer from '@/components/Footer';
import Header from '@/components/Header/Header';
import EventList from '@/components/Event/EventList';

function Event() {
  return (
    <>
      <Header />
      <Container>
        <ListHeader>
          <Title>문화행사</Title>
          <FilterList>
            <FilterItem>전체</FilterItem>
            <FilterItem>분류</FilterItem>
            <FilterItem>무료</FilterItem>
            <FilterItem>자치구</FilterItem>
          </FilterList>
        </ListHeader>
        <EventList />
      </Container>
      <Footer page={'event'} />
    </>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 18.5rem);
  margin-top: 12rem;
  margin-bottom: 6.5rem;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  padding: 1.6rem 1.6rem 0.8rem 1.6rem;
  position: sticky;
  top: 12rem;
  width: 100%;
  max-width: 44rem;
  background-color: white;
`;

const Title = styled.div`
  font-size: ${props => props.theme.sizes.l};
  font-weight: bold;
  line-height: 2.8rem;
  color: ${props => props.theme.colors.neutral1};
  text-align: center;
`;

const FilterList = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const FilterItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.48rem 1.2rem;
  font-size: ${props => props.theme.sizes.s};
  background-color: ${props => props.theme.colors.neutral5};
  border-radius: 1.6rem;
`;

export default Event;
