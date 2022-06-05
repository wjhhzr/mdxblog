// @ts-nocheck
import React from 'react';
import ReactDom from 'react-dom'
import styled from 'styled-components';

// 抽屉包裹
const DrawerWrapper = styled.div`
    position: fixed;
    width: 100%;
    height: ${p=>`calc(100% - ${p.top || "0px"})`};
    top: ${ p => p.top || 0};
    left: 0;
    z-index: var(--custom-index);
`;

// 抽屉遮罩
const DrawerMask = styled.div`
    width: 100%;
    height: 100%;
    backdrop-filter: blur(8px);
    background: var(--color-blurred-background);
    z-index: calc(var(--custom-index) - 1);
`;

// 抽屉body
const DrawerContent = styled.div`
    width: 100%;
    height: 100%;
    z-index: var(--custom-index);
    position: absolute;
    left: 0;
    top: 0;
    touch-action: none;
`;

function Drawer({
    open,
    children,
    container,
    top,
    zIndex = 100,
}:{
    open?: boolean
    children?: any
    container?: any
    top?: any
    zIndex?:number
}) {

    if (!open) return null;

    const content = <DrawerWrapper top={top} style={{"--custom-index": zIndex}} >
        <DrawerMask />
        <DrawerContent  >
            {children && children}
        </DrawerContent>
    </DrawerWrapper>

    return ReactDom.createPortal(content, container || document.body)
}

export default Drawer;