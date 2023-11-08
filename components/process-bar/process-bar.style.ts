import {
  FONT_SIZE,
  FONT_WEIGHT,
  GLOBAL_COLOR,
  MIXIN_SCREEN
} from "constants/style";
import styled from "styled-components";

export const ContainerBullet = styled.div`
  display: flex;
  margin-top: 21px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Bullet = styled.div<{ active: boolean; skip: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.4);
  color: rgba(96, 96, 96, 0.4);
  font-size: ${FONT_SIZE.fontSize12};
  font-weight: ${FONT_WEIGHT.fontWeight700};
  @media (${MIXIN_SCREEN.smallHeight}) {
    width: 30px;
    height: 30px;
  }
  ${(props) =>
    props.active &&
    `
      width: 40px;
      height: 40px;
      color: #fff;
      background: ${GLOBAL_COLOR.defaultColor};
      @media (${MIXIN_SCREEN.smallHeight}) {
        width: 35px;
        height: 35px;
      }
    `}
  ${(props) =>
    props.skip &&
    `
      background: ${GLOBAL_COLOR.whiteColor};
    `}
  
`;

export const BulletLineContainer = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BulletLine = styled.div`
  border: 1px dashed ${GLOBAL_COLOR.defaultColor};
  opacity: 0.5;
  width: 200%;
`;
export const PictureBackIcon = styled.picture`
  position: absolute;
  z-index: 5;
  left: 0px;
`;
