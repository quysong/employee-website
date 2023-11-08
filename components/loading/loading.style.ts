import { GLOBAL_COLOR } from "constants/style";
import styled, { keyframes } from "styled-components";

export const LoadWrapper = styled.div`
  float: left;
  text-align: center;
`;

export const Load = styled.div``;

const loadingB = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 15px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

export const Line = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: ${GLOBAL_COLOR.defaultColor};
  &:nth-last-child(1) {
    animation: ${loadingB} 0.6s 0.1s linear infinite;
  }
  &:nth-last-child(2) {
    animation: ${loadingB} 0.6s 0.2s linear infinite;
  }
  &:nth-last-child(3) {
    animation: ${loadingB} 0.6s 0.3s linear infinite;
  }
`;
