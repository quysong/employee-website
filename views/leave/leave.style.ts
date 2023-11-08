import styled from "styled-components";
import { FONT_FAMILY, FONT_SIZE, FONT_WEIGHT, GLOBAL_COLOR } from 'constants/style';

export const ViewBox = styled.div`
  padding: 0 16px;
  font-family: ${FONT_FAMILY.timmana};
  color: ${GLOBAL_COLOR.whiteColor};
  padding-bottom: 80px;
`

export const BtnClear = styled.a`
  font-family: ${FONT_FAMILY.montserrat};
  font-weight: ${FONT_WEIGHT.fontWeight400};
  font-size: ${FONT_SIZE.fontSize14};
  line-height: 17px;
`

export const Title = styled.h3`
  font-weight: ${FONT_WEIGHT.fontWeight400};
  font-size: ${FONT_SIZE.fontSize24};
  line-height: 31.1px;
`

export const TitleCard = styled.h5`
  font-weight: ${FONT_WEIGHT.fontWeight400};
  font-size: ${FONT_SIZE.fontSize24};
  margin: 0;
`

export const RowHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Label = styled.label`
  font-weight: ${FONT_WEIGHT.fontWeight400};
  font-size: ${FONT_SIZE.fontSize13};
  font-family: ${FONT_FAMILY.montserrat};
  line-height: 17px;
`

export const WrapperWidth50Percent = styled.div`
width: max-content;
`

export const WrapperFileInput = styled.div`
  position: relative;
`

export const ViewTextChooseFile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const SpanChooseFile = styled.span`
  color: #FFD8D8;
  font-weight: ${FONT_WEIGHT.fontWeight400};
  font-family: ${FONT_FAMILY.montserrat};
  font-style: normal;
  font-size: ${FONT_SIZE.fontSize14};
`

export const InputFile = styled.input`
  width: 100%;
  min-width: 120px;
  max-width: 200px;
  position: absolute;
  height: 30px;
  background-color: red;
  &[type=file] {
    outline: 0;
    opacity: 0;
    color: red;
  }
`

export const Text = styled.p`
  color: #FFD8D8;
  font-family: ${FONT_FAMILY.montserrat};
  font-style: normal;
  font-weight: ${FONT_WEIGHT.fontWeight400};
  font-size: ${FONT_SIZE.fontSize14};
  line-height: 17px;
  text-align: center;
  margin-top: 29px;
`

export const TextSpan = styled.span`
  font-family: ${FONT_FAMILY.montserrat};
  font-style: normal;
  font-weight: ${FONT_WEIGHT.fontWeight700};
  font-size: ${FONT_SIZE.fontSize16};
  line-height: 20px;
  color: #FF8D02;
`

export const BoxTempView = styled.div`
  height: 25px;
`

export const BoxViewLabelView = styled.div`
  height: 48px; 
  display: flex; 
  align-items: center;
`

export const ErrorText = styled.span`
  margin-top: 8px;
  color: #FFFFFF;
  font-size: ${FONT_SIZE.fontSize12};
`
