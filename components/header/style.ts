import styled, { css } from "styled-components";
import { mobileBreakpoint } from "lib/function/cssMixins";

export const HeaderWapper = styled.header`
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 3;
  background: var(--color-background);
  transition: color 300ms linear, background 300ms linear;
  display: flex;
  align-items:center;
`;

export const HeaderLeft = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoFirst = styled.span`
  display: inline-block;
  font-weight: var(--font-weight-medium);
`;

export const LogoConact = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color-gray-500);
  padding: 8px;
  background-clip: content-box;
`;

export const LogoLast = styled.span`
  display: inline-block;
  font-weight: var(--font-weight-medium);
`;

export const NavigationWrapper = styled.nav`
  @media (max-width: 768px) {
    & {
      display: none;
    }
  }
`;

export const Hamburger = styled.button`
  display: none;
  ${mobileBreakpoint("display: block;")}
`

export const NavigationList = styled.ul`
  display: flex;
  list-style: none;
`;

export const NavigationItem = styled.li`
  opacity: 0.8;
`;

export const UnstyledButton = styled.button`
  opacity: 0.7;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  svg {
    overflow: visible;
  }
  border: 1px solid var(--color-text);
`;

export const MobileDrawerButton = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  display: block;
  margin: 0px;
  padding: 0px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  z-index: 10001;
`;

export const Line = styled.div``;
