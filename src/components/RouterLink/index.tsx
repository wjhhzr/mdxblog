import Link from 'next/link';
import styled, {css} from 'styled-components'
import React from 'react'
export const Externalink = styled.a`
  display: flex;
  font-size: 24px;
  letter-spacing: -1px;
  align-items: center;
  padding: 0px;
  text-decoration: none;
  color: var(--color-primary);
  cursor: pointer;

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

interface IPropsRouterLink {
    href: string
    type?: "nav" | "default"
    children: any
    style?: React.CSSProperties
} 

const RouterLink = ({
    href,
    type,
    children,
    style
}:IPropsRouterLink)=>{
    return <Link href={href} >
        <Externalink style={style} type={type} >{children}</Externalink>
    </Link>
}

export default RouterLink