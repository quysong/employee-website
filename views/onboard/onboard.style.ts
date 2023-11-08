import {
  FONT_SIZE,
  FONT_WEIGHT,
  GLOBAL_COLOR,
  MIXIN_SCREEN,
} from "constants/style";
import SwipeableViews, { SwipeableViewsProps } from "react-swipeable-views";
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

export const Swipe: React.FunctionComponent<SwipeableViewsProps> = styled(
  SwipeableViews
)`
  width: 100%;
  max-width: ${MIXIN_SCREEN.smallScreen};
  position: relative;
  margin-top: 16px;
  @media (${MIXIN_SCREEN.mediumHeight}) {
    margin-top: 12px;
  }
  @media (${MIXIN_SCREEN.smallHeight}) {
    margin-top: 8px;
  }
` as any;

export const Slide = styled.div`
  width: 100%;
  height: 300px;
  background-color: red;
  background-color: blueviolet !important;
`;

export const Title = styled.h1`
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

export const TitleSmall = styled.h1`
  font-weight: ${FONT_WEIGHT.fontWeight700};
  font-size: ${FONT_SIZE.fontSize18};
  color: ${GLOBAL_COLOR.whiteColor};
  line-height: 39.01px;
  @media (${MIXIN_SCREEN.mediumHeight}) {
    line-height: unset;
  }
  @media (${MIXIN_SCREEN.smallHeight}) {
    line-height: unset;
  }
`;

export const TitleSpan = styled.span`
  color: ${GLOBAL_COLOR.brightRed};
`;

export const TextTitle = styled.p`
  color: ${GLOBAL_COLOR.whiteColor};
  font-weight: ${FONT_WEIGHT.fontWeight400};
  font-size: ${FONT_SIZE.fontSize16};
  line-height: 19.5px;
  margin: 0;
  margin-top: 7px;
  @media (${MIXIN_SCREEN.mediumHeight}) {
    line-height: unset;
  }
  @media (${MIXIN_SCREEN.smallHeight}) {
    line-height: unset;
    margin: 3px;
  }
`;

// Step 2
export const TextFont14 = styled.p`
  font-family: ${FONT_FAMILY.montserrat};
  font-size: ${FONT_SIZE.fontSize14};
  font-weight: ${FONT_WEIGHT.fontWeight400};
  line-height: 17px;
  color: ${GLOBAL_COLOR.whiteColor};
  margin: 0;
  margin-bottom: 20px;
  @media (${MIXIN_SCREEN.mediumHeight}) {
    margin-bottom: 15px;
  }
`;

export const RowCenter = styled.div<{ marginTop?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ marginTop }) => `${marginTop ? marginTop + "px" : "unset"}`};
  @media (${MIXIN_SCREEN.mediumHeight}) {
    margin-top: ${({ marginTop }) =>
    `${marginTop ? marginTop / 2 + 2 + "px" : "unset"}`};
  }
  @media (${MIXIN_SCREEN.smallHeight}) {
    margin-top: ${({ marginTop }) =>
    `${marginTop ? marginTop / 2 + "px" : "unset"}`};
  }
`;

export const RowGap = styled.div<{ gap?: number }>`
  display: flex;
  gap: ${(props) => `${props.gap ?? 0}px`};
`;

// Step 3
export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OptionalEmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 15px 20px;
  row-gap: 15px;
  @media (${MIXIN_SCREEN.mediumHeight}) {
    padding: 30px 15px 5px;
    row-gap: 10px;
  }
  h1 {
    margin-left: 5px;
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

//step 5

export const ColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Step5TextFont16 = styled.p`
  font-size: ${FONT_SIZE.fontSize16};
  font-weight: ${FONT_WEIGHT.fontWeight400};
  line-height: 17px;
  color: ${GLOBAL_COLOR.whiteColor};
  margin: 0;
  text-align: center;
`;

export const Step5Title = styled.h1`
  font-family: "Timmana";
  font-weight: ${FONT_WEIGHT.fontWeight400};
  font-size: ${FONT_SIZE.fontSize24};
  line-height: 39px;
  text-align: center;
  color: ${GLOBAL_COLOR.whiteColor};
  @media (${MIXIN_SCREEN.mediumHeight}) {
    line-height: unset;
  }
  @media (${MIXIN_SCREEN.smallHeight}) {
    line-height: unset;
  }
`;

export const ErrorText = styled.span`
  font-size: ${FONT_SIZE.fontSize14};
  font-weight: ${FONT_WEIGHT.fontWeight400};
  color: ${GLOBAL_COLOR.whiteColor};
`;

export const ContainerNumber = styled.div`
  position: "fixed";
  bottom: 0;
  left: 0;
  right: 0;
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
