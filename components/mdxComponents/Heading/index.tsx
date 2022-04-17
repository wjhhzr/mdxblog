import React, { useEffect, useRef } from 'react';
import styled,{css} from "styled-components";


interface HeaderProps {
    level: number
}

const Heading = styled.div<HeaderProps>`
    margin-bottom:  ${props=> `calc(${6 - props.level} * 8px)`};
    font-size:  ${props=> `calc(${6 - props.level} * .5rem)`};
    scroll-margin-top: 60px;
    ${({level})=>{
        if (level === 2) {
            return css`color: var(--color-tertiary);`
        }else if (level === 3) {
            return css`color: var(--color-gray-900);`
        }
    }}
`;

interface IPropsHeading {
    level: number
    id?: string
    mounted?:(dom:HTMLElement)=>void
    children: React.ReactNode
}

function ArticleHeading({
    level,
    id,
    children,
    mounted
}:IPropsHeading){
    const domRef = useRef<HTMLDivElement>()
    useEffect(()=>{
        mounted && mounted(domRef.current!)
    },[mounted])
    return <Heading id={id} ref={domRef} as={`h${level}`} level={level} >{children}</Heading>

}


export default ArticleHeading;