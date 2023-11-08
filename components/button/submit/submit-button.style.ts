import {
  FONT_SIZE,
  FONT_WEIGHT,
  GLOBAL_COLOR,
  MIXIN_SCREEN,
} from "constants/style";
import styled from "styled-components";

export const NormalButton = styled.button<{ btnType: "normal" | "iconLeft" }>`
  font-family: "Timmana";
  height: 48px;
  min-width: 160px;
  padding: 0 20px;
  padding-top: 10px;
  background-color: ${GLOBAL_COLOR.whiteColor};
  font-weight: ${FONT_WEIGHT.fontWeight400};
  font-size: ${FONT_SIZE.fontSize20};
  text-align: center;
  color: ${GLOBAL_COLOR.defaultColor};
  box-sizing: border-box;
  border-radius: 24px;
  border: 0;
  cursor: pointer;
  ${(props) => {
    if (props.btnType === "iconLeft") {
      return `
        height: 39px;
        min-width: 133px;
        width: 133px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        background-color: ${GLOBAL_COLOR.defaultColor};
        color: ${GLOBAL_COLOR.whiteColor};
        font-size: ${FONT_SIZE.fontSize15};
        font-weight: ${FONT_WEIGHT.fontWeight700};
        box-shadow: unset;
      `;
    }
  }}

  @media (${MIXIN_SCREEN.smallHeight}) {
    height: 40px;
    padding-top: 8px;
  }
`;
