import styled from 'styled-components';
import {ReactComponent as Share} from '@/assets/img/share.svg';
import {ReactComponent as Like} from '@/assets/img/like.svg';
import {delLike, postLike} from '@/apis/api/like';
import {useModalStore} from '@/store/modal';
import {User} from '@/store/user';
import {modalHeightM} from '@/assets/data/constant';
import {useQueryClient} from '@tanstack/react-query';

interface ImageProps {
  id: number;
  title: string;
  imageUrl: string;
  isVisited: boolean;
  isLiked: boolean;
  category: string;
  user: User | null;
}

function MainImage({
  id,
  title,
  imageUrl,
  isVisited,
  isLiked,
  category,
  user,
}: ImageProps) {
  const {openModal} = useModalStore();
  const queryClient = useQueryClient();

  const handleLike = async () => {
    if (!user) {
      openModal({
        type: 'guest',
        height: modalHeightM,
        title: '로그인이 필요합니다',
      });
    } else {
      if (isLiked) {
        try {
          await delLike(id);
          queryClient.invalidateQueries({queryKey: ['info', id]});
          queryClient.invalidateQueries({
            queryKey: ['likes'],
            refetchType: 'all',
          });
        } catch (error) {
          console.log('delete like fail: ', error);
        }
      } else {
        try {
          await postLike(id);
          queryClient.invalidateQueries({queryKey: ['info', id]});
          queryClient.invalidateQueries({
            queryKey: ['likes'],
            refetchType: 'all',
          });
        } catch (error) {
          console.log('post like fail: ', error);
        }
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
          {isLiked ? (
            <Like stroke='#DB2777' fill='#DB2777' />
          ) : (
            <Like stroke='#374151' />
          )}
        </ButtonWrap>
      </ButtonArea>
      <LabelArea>
        <LabelWrap>{category}</LabelWrap>
        {isVisited && <LabelWrap>방문 완료</LabelWrap>}
      </LabelArea>
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
  box-shadow: inset 0px 30px 30px 10px rgba(0, 0, 0, 0.1);
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

const LabelArea = styled.div`
  display: flex;
  column-gap: 1rem;
  position: absolute;
  bottom: 1.2rem;
  left: 1.2rem;
`;

const LabelWrap = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  font-size: ${props => props.theme.sizes.xs};
  border-radius: 25px;
  padding: 0.5rem 1rem;
`;

export default MainImage;
