import styled from 'styled-components';
import {ReactComponent as Share} from '@/assets/img/share.svg';
import {ReactComponent as Like} from '@/assets/img/like.svg';
import {useState} from 'react';
import {delLike, postLike} from '@/apis/api/like';

interface ImageProps {
  id: number;
  title: string;
  imageUrl: string;
  isLiked: boolean;
  category: string;
}

function MainImage({id, title, imageUrl, isLiked, category}: ImageProps) {
  const [like, setLike] = useState<boolean>(isLiked);

  const handleLike = async () => {
    if (like) {
      try {
        await delLike(id);
        setLike(false);
      } catch (error) {
        console.log('delete like fail: ', error);
      }
    } else {
      try {
        await postLike(id);
        setLike(true);
      } catch (error) {
        console.log('post like fail: ', error);
      }
    }
  };

  const handleShare = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      });
    }
  };

  return (
    <Container $img={imageUrl}>
      <ButtonArea>
        <ButtonWrap onClick={() => handleShare()}>
          <Share />
        </ButtonWrap>
        <ButtonWrap onClick={() => handleLike()}>
          {like ? (
            <Like stroke='#DB2777' fill='#DB2777' />
          ) : (
            <Like stroke='#374151' />
          )}
        </ButtonWrap>
      </ButtonArea>
      <CategoryWrap>{category}</CategoryWrap>
    </Container>
  );
}

const Container = styled.div<{$img: string}>`
  width: 100%;
  height: 25rem;
  position: relative;
  background-image: url(${props => props.$img});
  background-size: cover;
  background-position-y: center;
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 0.8rem;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
`;

const ButtonWrap = styled.button`
  background-color: white;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  padding: 0.8rem;
`;

const CategoryWrap = styled.div`
  position: absolute;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  font-size: ${props => props.theme.sizes.xs};
  border-radius: 25px;
  padding: 0.5rem 1rem;
  bottom: 1.2rem;
  left: 1.2rem;
`;

export default MainImage;
