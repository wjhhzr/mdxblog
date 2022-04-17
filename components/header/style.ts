import styled, { css } from "styled-components";

export const MaxWidthWapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderWapper = styled.header`
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 3;
  background: var(--color-background);
  transition: background 300ms ease;
  display: flex;
  align-items:center;
`;

export const HeaderLeft = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

export const Externalink = styled.a`
  display: flex;
  font-size: 24px;
  letter-spacing: -1px;
  align-items: center;
  padding: 0px;
  text-decoration: none;
  color: var(--color-primary);

  ${(props) => {
    if (props.type === "nav") {
      return css`
        display: flex;
        align-items: center;
        padding: 10px;
        text-decoration: none;
        color: var(--color-text);
        font-weight: var(--font-weight-medium);
        font-size: 1rem;
      `;
    }
  }}
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

export const NavigationList = styled.ul`
  display: flex;
  list-style: none;
`;

export const NavigationItem = styled.li``;

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
