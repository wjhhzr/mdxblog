// @ts-nocheck
import React, { useState } from "react";
import {
  HeaderWapper,
  HeaderLeft,
  HeaderRight,
  LogoFirst,
  LogoLast,
  NavigationList,
  NavigationWrapper,
  NavigationItem
} from "./style";
import MobileNavBar from 'components/mobileNavbar/mobileNavBar'
import DarkModeToggleContainer from '../darkModeToogle'
import RouterLink from "components/RouterLink";
import MaxWidthWrapper from "components/maxWidthWrapper";
import { ROUTES } from "src/constants";
const Header = () => {
  return (
    <HeaderWapper>
      <MaxWidthWrapper style={{display:"flex", alignItems:"center", justifyContent: "space-between", paddingBottom: 0, paddingTop: 0}} >
        <HeaderLeft>
          <RouterLink href="/" >
            <LogoFirst>东方战虎</LogoFirst>.<LogoLast>辉</LogoLast>
          </RouterLink>
          <NavigationWrapper>
            <NavigationList>
              {ROUTES.map(({route, href, headerHidden}) => {
                return !headerHidden && <NavigationItem key={href}>
                  <RouterLink type="nav" href={href}>
                    {route}
                  </RouterLink>
                </NavigationItem>
              })}
            </NavigationList>
          </NavigationWrapper>
        </HeaderLeft>
        <HeaderRight>
          <MobileNavBar />
          <DarkModeToggleContainer />
        </HeaderRight>
      </MaxWidthWrapper>
    </HeaderWapper>
  );
};

export default Header;