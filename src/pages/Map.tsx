import styled from 'styled-components';
import Header from '../components/Header/Header';
import BottomNav from '../components/BottomNav';

function Map() {
  return (
    <>
      <Header />
      <main>
        <div>지도</div>
      </main>
      <BottomNav page={'map'} />
    </>
  );
}

export default Map;
