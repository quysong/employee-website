import { GLOBAL_COLOR, MIXIN_SCREEN } from "constants/style";
import styled from "styled-components";

export const SingleInput = styled.input`
  width: 48px;
  height: 48px;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: ${GLOBAL_COLOR.whiteColor};
  outline: none;
  border: 1px solid ${GLOBAL_COLOR.whiteColor};
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  font-family: "Montserrat", sans-serif;

  &::placeholder {
    color: rgba(96, 96, 96, 0.4);
  }

  @media (max-width: ${MIXIN_SCREEN.smallWidth360}) {
    width: 43px;
    height: 43px;
  }
`;

export const InputOTPWrapper = styled.div<{ isError: boolean }>`
  margin-top: 8px;

  input {
    border-color: ${({ isError }) =>
      isError ? `${GLOBAL_COLOR.brightRed} !important` : "transparent"};
  }
`;
