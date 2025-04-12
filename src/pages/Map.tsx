import styled from 'styled-components';
import Layout from '@/components/common/Layout';
import Header from '@/components/Header/Header';
import Footer from '@/components/common/Footer';

function Map() {
  return (
    <>
      <Header />
      <Layout headerHeight='6.4rem'>
        <div>지도</div>
      </Layout>
      <Footer />
    </>
  );
}

export default Map;
