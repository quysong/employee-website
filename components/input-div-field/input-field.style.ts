import { FONT_SIZE, FONT_WEIGHT, GLOBAL_COLOR } from "constants/style";
import styled from "styled-components";

type InputWrapperProps = {
  isError?: string | null;
  outline?: boolean;
  haveLabel: boolean;
  isFocus: boolean;
};

export const InputDiv = styled.div`
  width: 100%;
  height: 100%;
  outline: none;
  border: 0;
  font-size: ${FONT_SIZE.fontSize16};
  font-weight: ${FONT_WEIGHT.fontWeight700};
  line-height: 20px;
  background-color: transparent;
 
`;

export const PlaceHolder = styled.span`
  color: rgba(96, 96, 96, 0.4);
`

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
  border-color: ${GLOBAL_COLOR.whiteColor};
  border-radius: 10px;
  padding: 12px;
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
  ${({ isFocus }) => isFocus && `
    border-color: blue;
  `}
  ${({ isError }) =>
    isError && `
    border-color: ${GLOBAL_COLOR.brightRed};
  `};
`;
