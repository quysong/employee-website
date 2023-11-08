import { FONT_FAMILY, GLOBAL_COLOR } from "constants/style";
import styled from "styled-components";

export const HolidaysWrapper = styled.div`
    display: flex;
    padding: 0 16px 80px;
    flex-direction: column;
    row-gap: 20px;
    overflow: auto;
`

export const PageHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px;

    p{
        margin: 0;
        font-family: ${FONT_FAMILY.timmana};
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 39px;
        margin-bottom: -10px;
        color: ${GLOBAL_COLOR.whiteColor};
    }

    span{
        margin: 10px;
    }
`

export const PaddingWrapper = styled.div`
    padding: 0 16px;
`

export const HolidayItem = styled.div<{type?: 'today'}>`
    padding: 26px 28px;
    border: 1px solid ${GLOBAL_COLOR.cottageCoreSunset};
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    box-sizing: border-box;
    background-color: ${({type}) => type ? GLOBAL_COLOR.whiteColor : ''};
    box-shadow:${({type}) => type ? '0px 12px 24px rgba(0, 0, 0, 0.24)' : ''};

    p{
       color: ${({type}) => type ? GLOBAL_COLOR.defaultColor : GLOBAL_COLOR.whiteColor};
    }
`

export const HolidayItemTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const HolidayItemName = styled.p<{color?: string}>`
    color: ${({color}) => color || GLOBAL_COLOR.whiteColor};
    font-family: ${FONT_FAMILY.montserrat};
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    margin: 0;
`

export const HolidayItemType = styled.p<{color?: string}>`
    color: ${({color}) => color || GLOBAL_COLOR.whiteColor};
    font-family: ${FONT_FAMILY.montserrat};
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    margin: 0;
    text-align: right;
`

export const HolidayTodayItem = styled.div`
    padding: 6px 28px;
    border: 1px solid ${GLOBAL_COLOR.cottageCoreSunset};
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    height: 120px;
    box-sizing: border-box;
    background-image: url('/images/holiday-today-bg.png');
    background-color: white;
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.24);

    p{
        color: #E93E5C;
    }
`