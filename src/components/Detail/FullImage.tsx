import styled from 'styled-components';

function FullImage({imageUrl}: {imageUrl: string}) {
  return (
    <Container>
      <Title>상세 이미지</Title>
      <ImageWrap src={imageUrl} alt='상세 이미지' />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding-bottom: 1rem;
`;

const Title = styled.div`
  font-size: ${props => props.theme.sizes.l};
  font-weight: bold;
  padding: 1.6rem;
`;

const ImageWrap = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default FullImage;
