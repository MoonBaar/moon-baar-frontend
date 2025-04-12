import styled from 'styled-components';
import Layout from '@/components/common/Layout';
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer';
import {basicHeaderHeight} from '@/assets/data/constant';

function Map() {
  return (
    <>
      <Header />
      <Layout headerHeight={basicHeaderHeight}>
        <div>지도</div>
      </Layout>
      <Footer />
    </>
  );
}

export default Map;
