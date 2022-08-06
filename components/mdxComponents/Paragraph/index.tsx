// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import styled from "styled-components";

const ParagraphWrapper = styled.p`
    font-size: calc(1.1875rem);
    margin-bottom: 32px;
`;

interface IPropsHeading {
    children: React.ReactNode
}

function Paragraph({
    children,
    ...rest
}:IPropsHeading){
    
    return <ParagraphWrapper {...rest} >
        {children}
    </ParagraphWrapper>
}


export default Paragraph;