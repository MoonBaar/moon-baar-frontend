import styled from 'styled-components';
import {Container} from './Event';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';

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
