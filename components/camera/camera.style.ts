import { GLOBAL_COLOR, MIXIN_SCREEN } from "constants/style";
import styled from "styled-components";

export const CameraContainer = styled.div`
  width: 100%;
  max-width: ${MIXIN_SCREEN.smallScreen};
  position: relative;
  overflow: hidden;
`;

export const ViewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5% auto;
  position: relative;
  border: 1px solid ${GLOBAL_COLOR.defaultColor80} !important;
  width: 95%;
  overflow: hidden;
  border-radius: 24px;
  max-height: 300px;
`;

export const Video = styled.video`
  width: 100%;
  background-color: #e9e8ee !important;
`;

export const Control = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding-bottom: 32px;
`;

export const ButtonTrigger = styled.button`
  position: relative;
  width: 65px;
  height: 65px;
  background-color: transparent;
  border-radius: 50%;
  border: 2px solid white;
  padding: 15px 20px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2),
      0 0 0 0.3rem rgba(255, 255, 255, 0.4);
  }

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    content: "";
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const ButtonIconSwitch = styled.div`
  filter: invert(1);
  z-index: 9999;
`;

export const ImageIconSwitch = styled.img`
  height: 40px;
`;

export const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 40%;
  left: 50%;
  z-index: 1000;
  transform: translate(-40%, -50%);
`;
