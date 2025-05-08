import {useEffect, useState} from 'react';
import styled from 'styled-components';

function FullImage({imageUrl}: {imageUrl: string}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setHasError(true);
      return;
    }

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => setIsLoaded(true);
    img.onerror = () => setHasError(true);
  }, [imageUrl]);

  if (hasError) return null;
  if (!isLoaded) return null;

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
