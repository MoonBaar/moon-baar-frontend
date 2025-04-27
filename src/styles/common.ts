import styled, {css} from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  max-width: 44rem;
  width: 100%;
  background-color: white;
  box-shadow:
    0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -2px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const LoginMessage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  gap: 1.6rem;
  font-size: ${props => props.theme.sizes.s};
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 8rem;
  gap: 0.6rem;
  font-size: ${props => props.theme.sizes.m};
`;

export const Title = styled.h2`
  font-size: ${props => props.theme.sizes.l};
  font-weight: bold;
  line-height: 2.8rem;
  text-align: center;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: transparent;
`;

export const FilterItemContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const TriggerButton = styled.button<{$isSelectedValue: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.48rem 1.2rem;
  width: 100%;
  max-width: max-content;
  height: 3rem;
  font-size: ${props => props.theme.sizes.s};
  background-color: ${props =>
    props.$isSelectedValue
      ? props.theme.colors.secondary
      : props.theme.colors.neutral5};
  color: ${props => props.theme.colors.primary};
  border-radius: 1.6rem;
`;

export const SvgImg = styled.img`
  filter: invert(58%) sepia(30%) saturate(442%) hue-rotate(111deg)
    brightness(92%) contrast(90%);
`;

export const CloseImage = styled(SvgImg)`
  width: 0.9rem;
  height: 0.9rem;
  margin-left: 0.5rem;
`;

export const DropDownImage = styled(SvgImg)`
  width: 1.1rem;
  height: 1.1rem;
  margin: 0.2rem 0 0 0.5rem;
`;

export const SkeletonAnimation = css`
  background: linear-gradient(90deg, #eeeeee 25%, #dddddd 37%, #eeeeee 63%);
  background-size: 400% 100%;
  animation: loading 1.4s ease infinite;

  @keyframes loading {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;
