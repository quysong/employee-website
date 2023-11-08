import { GLOBAL_COLOR, MIXIN_SCREEN } from "constants/style";
import styled from "styled-components";

export const NavigationBottomWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: ${MIXIN_SCREEN.smallScreen};
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: ${GLOBAL_COLOR.whiteColor};
    box-shadow: 0px -12px 24px rgba(0, 0, 0, 0.24);
    border-radius: 24px 24px 0 0;
    height: 60px;
    z-index: 2;

    p{
        margin: 0;
        font-size: 10px;
    }
`

export const NavItemWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 62px;
`

export const NavItemName = styled.p<{ isActive?: boolean }>`
    color: ${({ isActive }) => isActive ? '#D817CA' : '#606060'};
    margin-top: 4px !important;
`