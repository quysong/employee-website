import { FONT_SIZE, FONT_WEIGHT, GLOBAL_COLOR } from "constants/style";
import styled from "styled-components";

export const ViewBox = styled.div<{ active: boolean }>`
  position: fixed;
  top: 25px;
  right: 0px;
  border-radius: 24px 0px 0px 24px;
  background: ${GLOBAL_COLOR.whiteColor};
  padding: 15px 15px 15px 15px;
  box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transform: translateX(calc(100% + 30px));
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
  ${({ active }) =>
    active &&
    `
    transform: translateX(0%);
  `}
  font-size: ${FONT_SIZE.fontSize11};
  font-weight: ${FONT_WEIGHT.fontWeight400};
  z-index: 1000;
`;

export const ToastContent = styled.div`
  display: flex;
  align-items: center;
`;
export const Progress = styled.div<{ active: boolean, type: "error" | "success" | "warning" | null }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: ${({ type }) => type === 'success' ? '#25AE88' : type === 'warning' ? '#FFCC00' : '#FE4949'};
  }
  
`;
export const ToastText = styled.div`
  margin-left: 20px;
  max-width: 80%;
`;
