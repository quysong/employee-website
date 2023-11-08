import React from "react";
import { NavItemName, NavItemWrapper, NavigationBottomWrapper } from "./navigation-bottom.style";
import { SVGIcon } from "components/svg-icon/Icon";

type NavigationBottomProps = {
    [x: string]: any,
    tabs: Array<{name: string, icon: string, activeUrl: string}>,
    pathname: string;
    push: any;
}

const NavigationBottom:React.FC<NavigationBottomProps> = ({tabs, pathname, push}) => {
    return(
        <NavigationBottomWrapper>
            {tabs.map((item: any, index: number) => (
                <NavItemWrapper key={`navigation-bottom-${index}`} onClick={()=> item.activeUrl != '/temp' && push(item.activeUrl)}>
                    <SVGIcon name={item.icon} size={24} color={pathname.includes(item.activeUrl) ? '#D817CA' : '#606060'}/>
                    <NavItemName isActive={pathname.includes(item.activeUrl)}>{item.name}</NavItemName>
                </NavItemWrapper>
            ))}
        </NavigationBottomWrapper>
    )
}

export default NavigationBottom;