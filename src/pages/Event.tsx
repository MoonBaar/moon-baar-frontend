import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header/Header';

function Event() {
  return (
    <>
      <Header />
      <Container>
        <div>문화화행사 목록</div>
        <EventItem>
          <div>행사 1</div>
        </EventItem>
        <EventItem>
          <div>행사 2</div>
        </EventItem>
        <EventItem>
          <div>행사 3</div>
        </EventItem>
        <EventItem>
          <div>행사 4</div>
        </EventItem>
        <EventItem>
          <div>행사 5</div>
        </EventItem>
        <EventItem>
          <div>행사 6</div>
        </EventItem>
        <EventItem>
          <div>행사 7</div>
        </EventItem>
        <EventItem>
          <div>행사 8</div>
        </EventItem>
        <EventItem>
          <div>행사 9</div>
        </EventItem>
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
  gap: 1.6rem;
  padding: 2.4rem;
  min-height: calc(100vh - 18.5rem);
  margin-top: 12rem;
  margin-bottom: 6.5rem;
`;

const EventItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  height: 16.4rem;
  padding: 2.4rem;
  background-color: #f7f7f7;
  border-radius: 1.6rem;
`;

export default Event;
