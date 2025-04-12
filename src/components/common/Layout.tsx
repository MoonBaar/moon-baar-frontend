import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
  headerHeight: string;
  footerHeight?: string;
}

function Layout({
  children,
  headerHeight,
  footerHeight = '6.5rem',
}: LayoutProps) {
  return (
    <>
      <Container $headerHeight={headerHeight} $footerHeight={footerHeight}>
        {children}
      </Container>
    </>
  );
}

const Container = styled.main<{
  $headerHeight: string;
  $footerHeight: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${({$headerHeight, $footerHeight}) =>
    `calc(100vh - ${$headerHeight} - ${$footerHeight})`};
  margin-top: ${({$headerHeight}) => $headerHeight};
  margin-bottom: ${({$footerHeight}) => $footerHeight};
`;

export default Layout;
