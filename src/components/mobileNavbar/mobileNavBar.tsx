import React, { useRef, useState } from 'react';
import UnstyledButton from 'src/components//unstyledButton/unstyledButton'
import styled from 'styled-components';
import { useSpring, animated, useTrail } from 'react-spring';
import Drawer from 'src/components//drawer';
import DarkModeToggleContainer from '../darkModeToogle'
import RouterLink from 'src/components//RouterLink';
import { mobileBreakpoint } from "src/lib/function/cssMixins";
import { ROUTES } from 'src/constants';
const NavbarButton = styled(UnstyledButton)`
    display: none;
    z-index: 1000000;
    ${mobileBreakpoint("display: block;")}
`

const MenuWrapper = styled.div`
  height: 100%;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MenuNav = styled.nav`
    display: flex;
    flex-direction: column;
`;



function MobileNavBar() {
  // 是否打开
  const [open, setOpen] = useState(false);

  // 控制弹窗开关
  const bttonClick = (e) => {
    setOpen(!open)
  }

  const ref = useRef();

  const trail = useTrail(ROUTES.length, {
    transform: open ? 'translateX(0%)' : 'translateX(-100%)',
    opacity: open ? 1 : 0,
    config: {
      tension: 700,
      friction: open ? 60 : 20,
      // clamp: true,
    },
  });
  return <>
    <NavbarButton ref={ref} onClick={bttonClick} >
      <HamburgerFlippyIcon isOpen={open} size={26} />
    </NavbarButton>
    <Drawer open={open} container={(ref.current as HTMLElement)?.parentNode}  >
      <MenuWrapper>
        <MenuNav>
          {
            trail.map((style, index) => {
              const { route, href } = ROUTES[index];
              return <animated.div key={index} style={style} >
                <RouterLink type="nav" href={href} style={{fontSize: 26}} >{route}</RouterLink>
              </animated.div>
            })
          }
        </MenuNav>
        <div style={{ transition: "opacity 250ms ease 500ms", opacity: open ? 1 : 0 }} >
          <DarkModeToggleContainer id="mobile-nav" isMobile />
        </div>
      </MenuWrapper>
    </Drawer>
  </>
}

export default MobileNavBar;


const HamburgerFlippyIcon = ({ isOpen, size }) => {

  const svgProps = useSpring({
    transform: `rotate(${isOpen ? -45 : 0}deg)`,
    immediate: false,
    config: {
      tension: 150,
      friction: 25,
    },
  });

  const line1Props = useSpring({
    x1: isOpen ? size / 2 : size * 0.15,
    y1: isOpen ? 0 : size * 0.3,
    x2: isOpen ? size / 2 : size * 0.85,
    y2: isOpen ? size : size * 0.3,
    immediate: false,
    config: {
      tension: 150,
      friction: 22,
    },
  });
  const line2Props = useSpring({
    x1: isOpen ? 0 : size * 0.85,
    y1: isOpen ? size / 2 : size * 0.7,
    x2: isOpen ? size : size * 0.15,
    y2: isOpen ? size / 2 : size * 0.7,

    immediate: false,
    config: {
      tension: 110,
      friction: 22,
    },
  });

  return (
    <Svg
      style={{
        width: size,
        height: size,
        ...svgProps,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <animated.line
        {...line1Props}
        stroke="var(--color-text)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <animated.line
        {...line2Props}
        stroke="var(--color-text)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  );
};

const Svg = styled(animated.svg)`
  display: block;
  overflow: visible;
  transform-origin: center center;
  z-index: 100000001;
`;
