---
to: components/mdxComponents/<%= h.changeCase.lcFirst(name) %>/index.tsx
force: true
---
import React from 'react';
import styled from "styled-components";
const <%=name %>Wrapper = styled.div`

`;


interface IProps<%=name %> {
    children: React.ReactNode
}

function <%=name %>({
    children
}:IProps<%=name %>){

    return <<%=name %>Wrapper >
        {children}
    </<%=name %>Wrapper>
}


export default <%=name %>;

