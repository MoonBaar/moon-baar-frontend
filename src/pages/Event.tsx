import styled from 'styled-components';
import BottomNav from '../components/BottomNav';
import Header from '../components/Header/Header';

function Event() {
  return (
    <>
      <Header />
      <main>
        <div>문화화행사 목록</div>
      </main>
      <BottomNav page={'event'} />
    </>
  );
}

export default Event;
