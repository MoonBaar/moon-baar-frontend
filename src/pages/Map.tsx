import styled from 'styled-components';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import {Container} from './Event';

function Map() {
  return (
    <>
      <Header />
      <Container>
        <div>지도</div>
      </Container>
      <Footer page={'map'} />
    </>
  );
}

export default Map;
