import { FONT_SIZE, FONT_WEIGHT, GLOBAL_COLOR, MIXIN_SCREEN } from "constants/style";
import styled from "styled-components";

type InputWrapperProps = {
  isError?: string | null;
  outline?: boolean;
  haveLabel: boolean;
};

export const Input = styled.input<InputWrapperProps>`
  width: 100%;
  height: 100%;
  outline: none;
  border: 0;
  font-size: ${FONT_SIZE.fontSize16};
  font-weight: ${FONT_WEIGHT.fontWeight700};
  line-height: 20px;
  background-color: transparent;
  color: ${({ outline }) => (outline ? GLOBAL_COLOR.whiteColor : "black")};

  &::placeholder {
    color: ${({ outline }) => (outline ? "#BFBFBF" : "rgba(96, 96, 96, 0.4)")};
  }
`;

export const Label = styled.label`
  font-weight: ${FONT_WEIGHT.fontWeight400};
  font-size: ${FONT_SIZE.fontSize14};
  color: ${GLOBAL_COLOR.whiteColor};
  line-height: 17px;
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  width: 100%;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ isError }) =>
    isError ? GLOBAL_COLOR.brightRed : GLOBAL_COLOR.whiteColor};
  border-radius: 10px;
  padding: 5px;
  height: 48px;
  box-sizing: border-box;
  background-color: ${({ outline }) =>
    outline ? "transparent" : GLOBAL_COLOR.whiteColor};
  ${({ haveLabel }) => haveLabel && `margin-top: 12px`};
  ${({ isError }) =>
    !!isError &&
    `
    padding-right: 6px;
  `}
  position: relative;
`;

export const ErrorMessage = styled.span<{ showError: boolean }>`
  display: block;
  height: ${({ showError }) => (showError ? "20px" : "0")};
  font-size: ${FONT_SIZE.fontSize14};
  line-height: 17px;
  color: ${GLOBAL_COLOR.whiteColor};
  margin: ${({ showError }) => (showError ? "2.5px 0 2.5px 15px" : "0")};
  @media (${MIXIN_SCREEN.mediumHeight}) {
    height: ${({ showError }) => (showError ? "16px" : "0")};
    margin: ${({ showError }) => (showError ? "2.5px 0 2.5px 15px" : "0")};
    font-size: ${FONT_SIZE.fontSize12};
  }
  @media (${MIXIN_SCREEN.smallHeight}) {
    height: ${({ showError }) => (showError ? "14px" : "0")};
    margin: ${({ showError }) => (showError ? "2px 0 2.5px 15px" : "0")};
    font-size: ${FONT_SIZE.fontSize12};
  }
`;
