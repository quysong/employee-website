import { GLOBAL_COLOR } from 'constants/style';
import styled from "styled-components";

export const HistoryWrapper = styled.div`
    padding: 0 16px 80px;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    overflow: auto;
    padding-bottom: 80px;
`

export const PaddingWrapper = styled.div`
    padding: 0 16px;
`

export const HistoryItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 14px;
`

export const TimeLineTitle = styled.p`
    margin: 0;
    font-size: 14px;
    line-height: 17px;
    color: ${GLOBAL_COLOR.whiteColor};
    margin-left: 11px;
    position: relative;
    overflow: hidden;
    margin-bottom: -15px;

    &:after{
        content: "";
        display: inline-block;
        height: 0.5em;
        vertical-align: bottom;
        width: 100%;
        margin-right: -100%;
        margin-left: 10px;
        border-top: 1px solid white;
    }

    span{
        background-color: white;
        padding-right: 10px;
    }
`

export const TextBold = styled.b`
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
`

export const HistoryItem = styled.div<{type?: string}>`
    padding: 13px 13px 13px 28px;
    background: ${({type}) => type === 'declined' ? 'rgba(255, 255, 255, 0.38)' : type === 'approved' ? 'rgba(216, 23, 202, 0.8)' : GLOBAL_COLOR.cottageCoreSunset};
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.24);
    border-radius: 24px;
    box-sizing: border-box;
    row-gap: 17px;
    display: flex;
    flex-direction: column;

    p{
        color: ${({type}) => type === 'declined' ? '#262626' : type === 'pending' ? '#606060' : GLOBAL_COLOR.whiteColor};
    }
`

export const HistoryItemTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const TitleText = styled.p`
    display: inline-block;
    color: #606060;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    margin: 0;
`

export const HistoryStatus = styled.div<{type?: string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 13px;
    width: 160px;
    box-sizing: border-box;
    background-color: ${({type}) => type === 'declined' ? 'rgba(255, 33, 55, 0.75)' : GLOBAL_COLOR.whiteColor};
    color: ${({type}) => type === 'declined' ? 'rgba(255, 238, 238, 0.97)' : type === 'approved' ? GLOBAL_COLOR.defaultColor  : 'rgba(96, 96, 96, 0.4)'};
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    border-radius: 12px;
    text-transform: capitalize;

    span{
        margin-right: 10px;
    }
`

export const HistoryItemBottom = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

export const BottomText = styled.p`
    font-size: 14px;
    line-height: 17px;
    color: #606060;
    margin: 0;
`

export const SpaceBetweenWrapper = styled.div`
    display: flex;
    align-items: center;

    span{
        margin-right: 6px;
    }
`