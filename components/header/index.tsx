// @ts-nocheck
import React from "react";
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
} from "./style";
import { ThemeContext } from "lib/theme";
import DarkModeToggleContainer from '../darkModeToogle'
const Header = () => {
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
            </NavigationList>
          </NavigationWrapper>
        </HeaderLeft>
        <HeaderRight>
          {/* <DrawerButton /> */}
          <DarkModeToggleContainer />
        </HeaderRight>
      </MaxWidthWapper>
    </HeaderWapper>
  );
};

export default Header;