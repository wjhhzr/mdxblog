// @ts-nocheck
import React from "react";
import {
  MaxWidthWapper,
  HeaderWapper,
  Externalink,
  HeaderLeft,
  HeaderRight,
  LogoConact,
  LogoFirst,
  LogoLast,
  NavigationList,
  NavigationWrapper,
  NavigationItem,
  UnstyledButton,
} from "./style";
import { ThemeContext } from "lib/theme";
import { useTrail, animated as a,useSpring, useChain, useSpringRef } from "react-spring";
const Header = (props) => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);
  const isDark = colorMode === "dark";
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
          <UnstyledButton dark={isDark} title={isDark?"黑夜模式":"白天模式"} onClick={() => setColorMode(isDark ? "light" : "dark")} >
            <SunIcon
              dark={isDark}
              
            />
          </UnstyledButton>
        </HeaderRight>
      </MaxWidthWapper>
    </HeaderWapper>
  );
};

export default Header;

const SunIcon = (props) => {
  const { dark } = props;
  const trailRef = useSpringRef()
  const trail = useTrail(6, {
    config: { mass: 2, tension: 300, friction: 30 },
    scale: dark ? 0 : 1,
    display:dark? "none" :"block",
    transformOrigin: "center",
    ref:trailRef
  });
  const springRef = useSpringRef()
  const spring = useSpring({
    config: { mass: 10, tension: 1000, friction: 100 },
    cx: dark ? "10" : "25",
    cy: dark ? "2" : "0",
    rotate: dark ? "45deg":"90deg",
    r:dark ? "8" : "5",
    ref: springRef
  })

  const {cx,cy,r,rotate} = spring;
  const delay = [dark ? 1: 0, dark ? 0: 10]
  
  useChain(dark ? [trailRef, springRef] : [springRef, trailRef],delay)

  return (
    <a.svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      style={{rotate}}
      className="DarkModeToggle__MoonOrSun-sc-1ngd9fq-1 cwrIs"
      onClick={props.onClick}
    >
      <a.mask id="moon-mask-main-nav">
        <rect x="0" y="0" width="18" height="18" fill="#FFF"></rect>
        <a.circle
          cx={cx}
          cy={cy}
          r="8"
          fill="black"
        ></a.circle>
      </a.mask>
      <a.circle
        cx="9"
        cy="9"
        fill="var(--color-text)"
        mask="url(#moon-mask-main-nav)"
        r={r}
      ></a.circle>
      <a.g>
        <a.circle
          cx="17"
          cy="9"
          r="1.5"
          fill="var(--color-text)"
          style={trail[0]}
        ></a.circle>
        <a.circle
          cx="13"
          cy="15.928203230275509"
          r="1.5"
          fill="var(--color-text)"
          style={trail[1]}
        ></a.circle>
        <a.circle
          cx="5.000000000000002"
          cy="15.92820323027551"
          r="1.5"
          fill="var(--color-text)"
          style={trail[2]}
        ></a.circle>
        <a.circle
          cx="1"
          cy="9.000000000000002"
          r="1.5"
          fill="var(--color-text)"
          style={trail[3]}
        ></a.circle>
        <a.circle
          cx="4.9999999999999964"
          cy="2.071796769724492"
          r="1.5"
          fill="var(--color-text)"
          style={trail[4]}
        ></a.circle>
        <a.circle
          cx="13"
          cy="2.0717967697244912"
          r="1.5"
          fill="var(--color-text)"
          style={trail[5]}
        ></a.circle>
      </a.g>
    </a.svg>
  );
};
