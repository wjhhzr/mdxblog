import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { mobileBreakpoint } from 'lib/function/cssMixins'
type toc = { id: string, level: number }

interface IToc {
    tocs: toc[]
    curToc: string
}

interface Iprops {
    open: boolean
}

const MobileTocWrapper = styled.div`
    ${mobileBreakpoint("display: block;")}
    display: none;
    position: fixed;
    left: 0;
    right: 0;
    top: 60px;
    padding: 0 16px;
    z-index: 10;
    background-color: var(--color-background);
    box-shadow: 2px 3px 5px 0px var(--color-gray-100);
`;

const TocTitle = styled.div`
    display: flex;
    justify-content: space-between;
    z-index: 20;
`;

const Arrow = styled.span<Iprops>`
    display: block;
    width: 8px;
    height: 8px;
    border-top: 2px solid var(--color-text);
    border-right: 2px solid var(--color-text);
    border-radius: 2px;
    transform: rotate(135deg) translateY(2px);
    transition: transform 100ms ease-in-out;
    transform-origin: center;
    ${({open})=>open && css`
        transform: rotate(-45deg) translateY(2px);
    `}
`;

const TocMask = styled.div`
    position: fixed;
    z-index: 9;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    touch-action: none;
`;

const CurTocText = styled.div`

`;

const MuluText = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const TocList = styled.ul<Iprops>`
    transition: max-height 300ms ease-in-out;
    max-height:  0;
    ${({ open }) => open && "max-height: 1000px;"}
    overflow: hidden;
    touch-action: none;
`;

const TocItem = styled.li`

`;

export const ContentLink = styled.a`
  margin-left: ${(props) => `calc(20px * ${props["data-level"] - 2})`};
  display: block;
  text-decoration: none;
  opacity: 0.7;
  margin-top: 10px;
  transition: opacity 500ms ease 0;
  color: var(--color-gray-800);
  &:hover,
  &:focus {
    opacity: 1;
  }
`;

const MobileToc = ({
    tocs,
    curToc
}: IToc) => {
    const [open, setOpen] = useState(false)
    if (tocs?.length === 0) return null;
    return <MobileTocWrapper>
        <TocTitle onClick={() => setOpen(!open)} ><CurTocText>{curToc}</CurTocText><MuluText>??????<Arrow open={open}/></MuluText></TocTitle>
        <TocList open={open} >
            {tocs.map(({ id, level }) => {
                return <ContentLink onClick={() => setOpen(false)} key={id} href={`#${id}`} data-level={level} style={{ color: id === curToc && "var(--color-primary)", }} >{id}</ContentLink>
            })}
        </TocList>
    </MobileTocWrapper>
}

export default MobileToc;