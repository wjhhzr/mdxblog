// @ts-nocheck
import React, { useState } from "react";
import {
  MaxWidthWapper,
  HeaderWapper,
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
import RouterLink from "components/RouterLink";
const Header = () => {
  // 菜单是否打开
  const [open, setOpen] = useState(false)
  return (
    <HeaderWapper>
      <MaxWidthWapper>
        <HeaderLeft>
            <RouterLink href="/" >
              <LogoFirst>东方战虎</LogoFirst>.<LogoLast>辉</LogoLast>
            </RouterLink>
          <NavigationWrapper>
            <NavigationList>
              <NavigationItem>
                <RouterLink type="nav" href="/posts">
                  posts
                </RouterLink>
              </NavigationItem>
              <NavigationItem>
                <RouterLink type="nav" href="/about">
                  about
                </RouterLink>
              </NavigationItem>
              <NavigationItem>
                <RouterLink type="nav" href="/logs">
                  logs
                </RouterLink>
              </NavigationItem>
            </NavigationList>
          </NavigationWrapper>
        </HeaderLeft>
        <HeaderRight>
          {/* <DrawerButton /> */}
          <MobileNavBar />
          <DarkModeToggleContainer />
        </HeaderRight>
      </MaxWidthWapper>
    </HeaderWapper>
  );
};

export default Header;