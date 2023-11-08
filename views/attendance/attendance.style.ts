import { FONT_FAMILY, FONT_SIZE, FONT_WEIGHT, GLOBAL_COLOR, MIXIN_SCREEN } from "constants/style";
import styled from "styled-components";

export const ViewBox = styled.div`
    padding-bottom: 107px;
`

export const ViewRowButton = styled.div`
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-top: 20px;
`

export const ButtonTab = styled.div<{ active?: boolean }>`
    cursor: pointer;
   min-width: 108px;
   height: 48px;
   border-radius: 12px;
   text-align: center;
   display: flex;
   justify-content: center;
   align-items: center;
   color: ${GLOBAL_COLOR.cottageCoreSunset};
   font-size: ${FONT_SIZE.fontSize14};
   font-weight: ${FONT_WEIGHT.fontWeight700};
   ${({ active }) => active && `
        background-color: ${GLOBAL_COLOR.defaultColor80};
        color: ${GLOBAL_COLOR.whiteColor};
   `}
`

export const PageHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px;

    h2, p{
        margin: 0;
        font-family: ${FONT_FAMILY.timmana};
        font-style: normal;
        font-weight: ${FONT_WEIGHT.fontWeight400};
        font-size: ${FONT_SIZE.fontSize24};
        line-height: 39px;
        margin-bottom: -10px;
        color: ${GLOBAL_COLOR.whiteColor};
    }

    span{
        margin: 10px;
    }
`

export const HrTag = styled.hr`
    width: 100%;
`

export const WrapperHeaderCard = styled.div`
    padding: 15px 13px 0px 25px;
`

export const RowFlexEnd = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const TitleHeaderCard = styled.div`
    color: ${GLOBAL_COLOR.whiteColor};
    font-family: ${FONT_FAMILY.montserrat};
    font-weight: ${FONT_WEIGHT.fontWeight700};
    font-size: ${FONT_SIZE.fontSize16};
`

export const WrapperContents = styled.div`
    padding-left: 28px;
    padding-right: 25px;
`

export const WrapperContentCard = styled.div`
    padding-left: 25px;
    padding-right: 25px;
`

export const RowCenter = styled.div`
    display: flex;
    justify-content: center;
`

export const RowSpaceBetween = styled.div`
    display: flex;
    justify-content: space-between;
`

export const TextCard = styled.p`
    color: ${GLOBAL_COLOR.cottageCoreSunset};
    font-family: ${FONT_FAMILY.montserrat};
    font-weight: ${FONT_WEIGHT.fontWeight400};
    font-size: ${FONT_SIZE.fontSize14};
    line-height: 17.07px;
`

export const TextSpanBoldCard = styled.span`
    font-family: ${FONT_FAMILY.montserrat};
    font-style: normal;
    font-weight: ${FONT_WEIGHT.fontWeight700};
    font-size: ${FONT_SIZE.fontSize16};
    line-height: 20px;
    color: ${GLOBAL_COLOR.whiteColor};
`

export const ViewNodeProgressBar = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  
`

export const ItemNodeProgressBar = styled.div<{ color?: string }>`
    border: 1px solid #FFD8D8;
    height: 12px;
    &:first-child {
        border-radius: 6px 0px 0px 6px;
    }
    &:last-child {
        border-radius: 0px 6px 6px 0px;
    }
    ${({ color }) => color && `
        background-color: ${color};
    `}
`