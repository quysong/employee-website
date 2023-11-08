import { FONT_SIZE, FONT_WEIGHT, MIXIN_SCREEN } from "constants/style";
import styled from "styled-components";

export const Container = styled.div`
  background-color: transparent;
  width: 100%;
  max-width: ${MIXIN_SCREEN.smallScreen};
  min-height: 200px;
  padding-top: 20px;
  @media (${MIXIN_SCREEN.smallHeight}) {
    padding-top: 15px;
  }
`;

export const Keyboard = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const Number = styled.div`
  width: 100%;
  font-size: 18px;
  text-align: center;
`;

export const Key = styled.div`
  font-family: 'Montserrat';
  display: inline-block;
  width: calc(100% / 3);
  height: 40px;
  padding-top: 20px;
  /* line-height: 60px; */
  cursor: pointer;
  transition: 250ms;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #ededed !important;
  font-size: ${FONT_SIZE.fontSize16};
  font-weight: ${FONT_WEIGHT.fontWeight500};
  overflow: hidden;
  @media (${MIXIN_SCREEN.mediumHeight}) {
    height: 35px;
    padding-top: 10px;
  }
  @media (${MIXIN_SCREEN.smallHeight}) {
    height: 35px;
  }
`;
