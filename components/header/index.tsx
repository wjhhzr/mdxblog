// @ts-nocheck
import React, { useState } from "react";
import {
  MaxWidthWapper,
  HeaderWapper,
  Externalink,
  HeaderLeft,
  HeaderRight,
  LogoFirst,
  LogoLast,
  NavigationList,
  NavigationWrapper,
  NavigationItem,
  Hamburger
} from "./style";
import MobileButton from 'components/mobileBotton/mobileBotton'
import MobileNavBar from 'components/mobileNavbar/mobileNavBar'
import DarkModeToggleContainer from '../darkModeToogle'
const Header = () => {
  // 菜单是否打开
  const [open, setOpen] = useState(false)
  return (
    <HeaderWapper>
      <MaxWidthWapper>
        <HeaderLeft>
          <Externalink href="/">
            <LogoFirst>东方战虎</LogoFirst>.<LogoLast>辉</LogoLast>
          </Externalink>
          <NavigationWrapper>
            <NavigationList>
              <NavigationItem>
                <Externalink type="nav" href="/posts">
                  posts
                </Externalink>
              </NavigationItem>
              <NavigationItem>
                <Externalink type="nav" href="/about">
                  about
                </Externalink>
              </NavigationItem>
              <NavigationItem>
                <Externalink type="nav" href="/logs">
                  logs
                </Externalink>
              </NavigationItem>
            </NavigationList>
          </NavigationWrapper>
        </HeaderLeft>
        <HeaderRight>
          {/* <DrawerButton /> */}
          <MobileNavBar  />
          <DarkModeToggleContainer />
        </HeaderRight>
      </MaxWidthWapper>
    </HeaderWapper>
  );
};

export default Header;