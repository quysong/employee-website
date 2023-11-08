import { FONT_FAMILY, FONT_SIZE, FONT_WEIGHT, GLOBAL_COLOR } from "constants/style";
import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 13px;
`;

export const SelectLang = styled.select`
  font-family: ${FONT_FAMILY.montserrat};
  background-color: transparent;
  border: unset;
  color: ${GLOBAL_COLOR.grayColor};
  font-weight: ${FONT_WEIGHT.fontWeight400};
  font-size: ${FONT_SIZE.fontSize14};
  font-style: normal;
  text-align: center;
  line-height: 17px;
`;
