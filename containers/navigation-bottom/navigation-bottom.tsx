import NavigationBottom from "components/navigation-bottom";
import { useRouter } from "next/router";
import React, { useState } from "react";

const NavigationBottomContainer = () => {
    const {pathname, push} = useRouter();
    
    const tabs = [
        {
            name: 'Portal',
            icon: 'globe',
            activeUrl: '/onboard',
        },
        {
            name: 'Profile',
            icon: 'user-profile',
            activeUrl: '/temp',
        },
        {
            name: 'Attendance',
            icon: 'clock',
            activeUrl: '/leave',
        },
        {
            name: 'Inbox',
            icon: 'bell',
            activeUrl: '/temp',
        },
    ]

    return (
        <NavigationBottom tabs={tabs} pathname={pathname} push={push}/>
    )
}

export default NavigationBottomContainer;