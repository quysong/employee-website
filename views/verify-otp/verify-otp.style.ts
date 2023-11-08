import {
  FONT_SIZE,
  FONT_WEIGHT,
  GLOBAL_COLOR,
  MIXIN_SCREEN,
} from "constants/style";
import styled from "styled-components";
import { FONT_FAMILY } from "./../../constants/style";

export const Wrapper = styled.div`
  width: 100%;
`;

export const ViewBox = styled.div`
  box-sizing: border-box;
  position: relative;
  margin-top: 16px;
  padding: 0 16px;
  @media (${MIXIN_SCREEN.mediumHeight}) {
    margin-top: 12px;
  }
  @media (${MIXIN_SCREEN.smallHeight}) {
    margin-top: 8px;
  }
`;

export const CenterElementWrapper = styled.div<{ margin?: string }>`
  display: flex;
  justify-content: center;
  margin: ${({ margin }) => margin || "auto"};
`;

export const TitleSmallExtend = styled.p`
  margin: 0;
  font-size: ${FONT_SIZE.fontSize24};
  font-family: ${FONT_FAMILY.timmana};
  font-weight: ${FONT_WEIGHT.fontWeight400};
  color: ${GLOBAL_COLOR.whiteColor};
  line-height: 39px;
`;

export const ResendOTPWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  margin-top: 16px;
  justify-content: center;
  @media (${MIXIN_SCREEN.mediumHeight}) {
    margin-bottom: 8px;
  }
  @media (${MIXIN_SCREEN.smallHeight}) {
    margin-bottom: 8px;
  }
  p {
    font-size: 14px;
    font-family: ${FONT_FAMILY.montserrat};
    font-weight: ${FONT_WEIGHT.fontWeight700};
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.span`
  display: flex;
  justify-content: center;
  color: ${GLOBAL_COLOR.whiteColor};
  margin: 10px 0 0 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

export const HeadText = styled.h1`
  font-weight: ${FONT_WEIGHT.fontWeight700};
  font-size: ${FONT_SIZE.fontSize32};
  color: ${GLOBAL_COLOR.whiteColor};
  line-height: 39px;
  margin: 0;
  margin-top: 16px;
  @media (${MIXIN_SCREEN.mediumHeight}) {
    margin-top: 12px;
  }
  @media (${MIXIN_SCREEN.smallHeight}) {
    margin-top: 8px;
  }
`;

export const HeadTextSpan = styled.span`
  color: ${GLOBAL_COLOR.brightRed};
`;

export const Title = styled.h2`
  font-family: ${FONT_FAMILY.timmana};
  font-style: normal;
  font-weight: ${FONT_WEIGHT.fontWeight400};
  font-size: ${FONT_SIZE.fontSize24};
  line-height: 39px;
  text-align: center;
  color: ${GLOBAL_COLOR.whiteColor};
  margin-top: 34px;
  margin-bottom: 34px;
`