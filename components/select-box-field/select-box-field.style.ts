import { FONT_FAMILY, FONT_SIZE, FONT_WEIGHT, GLOBAL_COLOR } from "constants/style";
import styled from "styled-components";

export const SelectBox = styled.select`
  height: 48px;
  border-radius: 12px;
  background-color: ${GLOBAL_COLOR.whiteColor};
  text-align: center;
  padding-left: 9px;
  padding-right: 9px;
`;

export const Option = styled.option`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.label`
  font-weight: ${FONT_WEIGHT.fontWeight400};
  font-size: ${FONT_SIZE.fontSize13};
  font-family: ${FONT_FAMILY.montserrat};
  line-height: 17px;
  margin-bottom: 9px;
`

export const WrapSelectBox = styled.div`
  position: relative;
`
