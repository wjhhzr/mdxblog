import React from 'react';
import styled from "styled-components";
const BlockquoteWrapper = styled.div`
    border-left: 5px solid var(--color-success);
    padding: 10px;
    margin-bottom: 2em;

    *:last-child {
        margin-bottom: 0;
    }
`;


interface IPropsBlockquote {
    children: React.ReactNode
}

function Blockquote({
    children
}:IPropsBlockquote){

    return <BlockquoteWrapper >
        {children}
    </BlockquoteWrapper>
}

export default Blockquote;

