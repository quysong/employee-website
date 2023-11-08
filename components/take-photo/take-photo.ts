import { FONT_SIZE, FONT_WEIGHT, GLOBAL_COLOR } from "constants/style";
import styled from "styled-components";

export const Text = styled.p`
  font-weight: ${FONT_WEIGHT.fontWeight700};
  font-size: ${FONT_SIZE.fontSize13};
  color: ${GLOBAL_COLOR.defaultColor};
  line-height: 16px;
  letter-spacing: -0.01em;
  margin: 0%;
`;

export const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
`;

export const CardImageRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const CardImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 9px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ImageCardId = styled.img`
  max-height: 100%; 
  height: auto;
  max-width: 100%;
  border-radius: 24px;
  border: 1px solid ${GLOBAL_COLOR.defaultColor80};
  /* transform: rotate(90deg); */
  height:107px ;
  width: 100%;
`;
